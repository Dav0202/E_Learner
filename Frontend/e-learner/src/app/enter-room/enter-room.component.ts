import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ChatserviceService } from 'src/app/services/chatservice.service';

@Component({
  selector: 'app-enter-room',
  templateUrl: './enter-room.component.html',
  styleUrls: ['./enter-room.component.css']
})
export class EnterRoomComponent implements OnInit {


  streamformdata: any = {};
 @Output() public onSelected: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private cs: ChatserviceService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  streamform = this.formBuilder.group({
    roomname: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });

  async msgToParent() {
    localStorage.setItem('name', this.streamform.value.name)
    localStorage.setItem('roomname', this.streamform.value.roomname)
    this.router.navigate(['/', 'video'])
    //const url: string = `http://127.0.0.1:8000/video/member/?name=${this.streamform.value.name}&room_name=${this.streamform.value.roomname}`
    this.streamform.reset()
    //return await lastValueFrom(this.http.post(url, requestoption))

  }
}
