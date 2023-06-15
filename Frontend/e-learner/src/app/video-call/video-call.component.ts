import { Component, OnInit, Renderer2, ElementRef, ViewChild, Input, AfterViewInit, EventEmitter, Output, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { v4 as uuid } from 'uuid'
import { ChatserviceService } from '../services/chatservice.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { EnterRoomComponent } from '../enter-room/enter-room.component'

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})

export class VideoCallComponent implements OnInit {

  streamformdata :any = {};

  CHANNEL_NAME: string = localStorage.getItem('roomname') || '{}';
  name2 = localStorage.getItem('name')
  token: any = {}
  remoteUsers: any = {
    localAudioTrack: null,
    localVideoTrack: null,
    remoteAudioTrack: null,
    remoteVideoTrack: null,
    screenTrack: null,
    remoteUid: null,
  };
  isMuteVideo = false;
  isMuteAudio = false;
  isSharingEnabled = false;
  localmember: any = {};
  //UID = this.uid()
  client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
  msg: any;
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private cs: ChatserviceService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.start()
    this.name()
    window.onbeforeunload = () => this.delMember()
  }

  //uid() { // min and max included//
  // return (Math.floor(Math.random() * (10000 - 1 + 1) + 1))
  //}
  async start() {
    this.token = await this.cs.getVideoToken(this.CHANNEL_NAME)
    console.log('fike', this.token)
    const APP_ID: string = 'fd93b6246bdf43a588d57c859b15d1d6';
    const APP_INSTANCE: string = '5a115da3593140b89897b1ba4ed811a5';

    console.log(this.token)
    await this.client.join(APP_ID, this.CHANNEL_NAME, this.token.token, this.token.uid)
    await this.createMember()
    // Create a local audio track from the audio sampled by a microphone.
    this.remoteUsers.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    // Create a local video track from the video captured by a camera.
    this.remoteUsers.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    this.localmember = await this.getMember(this.token)
    console.log(this.localmember, "xxxxx")
    const parent = document.getElementById(`user-${this.token.uid.toString()}`)
    // Publish the local audio and video tracks in the channel.
    await this.client.publish([this.remoteUsers.localAudioTrack, this.remoteUsers.localVideoTrack]);
    // Play the local video track.
    this.remoteUsers.localVideoTrack.play(parent);

    console.log("publish success!");
  }

  async name() {
    this.client.on('user-published', async (user, mediaType) => {
      await this.client.subscribe(user, mediaType)
      console.log('peer connected')

      if (mediaType == 'video') {

        let member = await this.getMember(user)
        console.log(member, 'xxxxx')

        const div2 = this.renderer.createElement('div');
        const div3 = this.renderer.createElement('div');
        const div4 = this.renderer.createElement('div');
        const span = this.renderer.createElement('span');
        const text = this.renderer.createText(member[0].name)
        this.renderer.appendChild(div2, div3)
        this.renderer.appendChild(div2, div4)
        this.renderer.appendChild(div4, span)
        this.renderer.appendChild(span, text)
        this.renderer.addClass(div2, 'video-container')
        this.renderer.setAttribute(div2, "id", `user-container-${user.uid.toString()}`);
        this.renderer.addClass(div3, 'video-player')
        this.renderer.setAttribute(div3, "id", `user-${user.uid.toString()}`);
        this.renderer.addClass(div4, 'username-wrapper')
        this.renderer.addClass(span, 'user-name')


        const parent2 = document.getElementById('video-streams') as HTMLInputElement

        this.remoteUsers.remoteVideoTrack = user.videoTrack;
        this.remoteUsers.remoteAudioTrack = user.audioTrack;
        this.remoteUsers.remoteUid = user.uid.toString();
        this.renderer.insertBefore(parent2, div2, this.renderer.nextSibling(div2));

        let parent = document.getElementById(`user-${user.uid.toString()}`)

        //this.remoteUsers.remoteUid = user.uid.toString();

        this.remoteUsers.remoteVideoTrack.play(parent);

        //let player = parent
        //if (player != null) {
        //  player.remove()
        //}

      }

      if (mediaType == 'audio') {
        this.remoteUsers.remoteAudioTrack = user.audioTrack;
        this.remoteUsers.remoteAudioTrack.play();
      }
    }
    )
    this.client.on("user-unpublished", async (user) => {
      delete this.remoteUsers[user.uid]
      let parent = document.getElementById(`user-container-${user.uid.toString()}`)
      parent?.remove()
    }
    );
  }

  async muteon() {
    if (this.isMuteVideo == false) {
      this.remoteUsers.localVideoTrack.setEnabled(false);
      this.isMuteVideo = true;
      let parent = document.getElementById('camera-btn')
      parent!.style.backgroundColor = '#ff0000'
    } else {
      this.remoteUsers.localVideoTrack.setEnabled(true);
      this.isMuteVideo = false;
      let parent = document.getElementById('camera-btn')
      parent!.style.backgroundColor = '#fff'
    }
  }

  async audioOn() {
    if (this.isMuteAudio == false) {
      this.remoteUsers.localAudioTrack.setVolume(0);
      this.isMuteAudio = true;
      let parent = document.getElementById('mic-btn')
      parent!.style.backgroundColor = '#ff0000'

    } else {
      this.remoteUsers.localAudioTrack.setVolume(100)
      this.isMuteAudio = false;
      let parent = document.getElementById('mic-btn')
      parent!.style.backgroundColor = '#fff'
    }
  }

  async screenshare() {
    if (this.isSharingEnabled == false) {
      this.remoteUsers.screenTrack = await AgoraRTC.createScreenVideoTrack({})
      await this.remoteUsers.localVideoTrack.replaceTrack(this.remoteUsers.screenTrack, true);
      this.isSharingEnabled = true;
    } else {
      await this.remoteUsers.screenTrack.replaceTrack(this.remoteUsers.localVideoTrack, true);
      this.isSharingEnabled = false;
    }
  }

  async leave() {
    for (let i = 0; i < this.remoteUsers.length - 1; i++) {
      this.remoteUsers[i].stop()
      this.remoteUsers[i].close()
    }
    await this.client.leave()
    this.router.navigate(['/', 'homepage'])
    this.delMember()
  }

  async createMember() {
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
      headers: new HttpHeaders(headers2)
    }
    const url: string = `http://127.0.0.1:8001/video/member/?name=${this.name2}&uid=${this.token.uid}&room_name=${this.CHANNEL_NAME}`
    return await lastValueFrom(this.http.post(url, requestoption))
  }

  async getMember(user: any) {
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
      headers: new HttpHeaders(headers2)
    }
    const url: string = `http://127.0.0.1:8001/video/member/?uid=${user.uid}&room_name=${this.CHANNEL_NAME}`
    const data: any = await lastValueFrom(this.http.get(url, requestoption))
    return data
  }



  async delMember() {
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
      headers: new HttpHeaders(headers2)
    }
    localStorage.removeItem('name')
    localStorage.removeItem('roomname')
    const url: string = `http://127.0.0.1:8001/video/member/?name=${this.name2}&uid=${this.token.uid}&room_name=${this.CHANNEL_NAME}`
    return await lastValueFrom(this.http.delete(url, requestoption))
  }


}
