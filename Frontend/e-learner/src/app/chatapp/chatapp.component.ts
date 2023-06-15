import { Component, OnInit, Renderer2, AfterViewChecked, ElementRef, ViewChild, AfterContentChecked } from '@angular/core';
import AgoraRTM from 'agora-rtm-sdk';
import { v4 as uuid } from 'uuid'
import { ChatserviceService } from '../services/chatservice.service';
import { FormBuilder, Validators } from '@angular/forms';
import { DatepipePipe } from '../pipes/datepipe.pipe';
import { NewUserService } from '../services/new-user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css']
})

export class ChatappComponent implements OnInit, AfterContentChecked {
  myDate: Date = new Date(Date.now());
  constructor(
    private cs: ChatserviceService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private cookie: CookieService,
    private pipe: DatepipePipe,
    private ns: NewUserService,
  ) { }

  @ViewChild('container') private container!: ElementRef;
  loginform: any
  messages: any
  channel: any
  elements: any;
  username2!: any ;

  ngOnInit(): void {
    this.name()
    this.getmesssage()
    this.username2 = this.cookie.get('username')
  }

   ngAfterContentChecked(){
    this.scrollToBottom()
   }



  async name() {
    const APP_ID: string = 'aed2ee2e3f8045e6bede35d4368ab694';
    const UID: string = String(uuid());
    const CHANNEL_NAME: string = 'main';
    const client = AgoraRTM.createInstance(APP_ID);

    await client.login({ uid: UID, token: undefined })

    this.channel = client.createChannel(CHANNEL_NAME)

    await this.channel.join()

    this.channel.on('ChannelMessage', (message: any, peerId: any) => {
      console.log('post', JSON.parse(message.text), peerId)
      this.createText(JSON.parse(message.text))
    })
    this.ns.toDecryptusername()

  }

  messageform = this.formBuilder.group({
    sender: [ '', [Validators.required]],
    body: ['', [Validators.required]],
  });

  getmesssage() {
    this.cs.getMessages().subscribe(data => {
      this.messages = data
      console.log(this.messages)
    }
    )

  }



  sendmessage() {
    if (this.messageform.value['body'] !== null || '' || undefined) {

      this.messageform.controls['sender'].setValue(this.username2);

      this.cs.postMessage(this.messageform.value).subscribe()
      this.elements = this.messageform.value
      console.log(this.elements)
      this.createText(this.elements)
      this.channel.sendMessage({ text: JSON.stringify(this.messageform.value), type: 'text' })
      this.messageform.reset()
    }
  }

  createText(message: any) {
    if (message !== undefined && message !== null) {

      const div = this.renderer.createElement('div');
      const div2 = this.renderer.createElement('div');
      const div3 = this.renderer.createElement('div');
      const div4 = this.renderer.createElement('div');
      const div5 = this.renderer.createElement('div');
      const div6 = this.renderer.createElement('div');
      const div7 = this.renderer.createElement('div');

      const date = this.renderer.createText(this.pipe.transform(this.myDate.toISOString()));

      const text = this.renderer.createText(message.body);
      const sender = this.renderer.createText(message.sender);
      // const img = this.renderer.createElement('img');

      this.renderer.setStyle(div2, 'background-image', "url(https://bootdey.com/img/Content/avatar/avatar7.png)" )
      this.renderer.appendChild(div, div2);
      this.renderer.appendChild(div, div3);
      this.renderer.appendChild(div3, div4);
      this.renderer.appendChild(div3, div7);
      this.renderer.appendChild(div4, div5);
      this.renderer.appendChild(div4, div6);

      this.renderer.appendChild(div6, date);
      this.renderer.appendChild(div5, sender);
      this.renderer.appendChild(div7, text);
      this.renderer.addClass(div, 'msg')
      this.renderer.addClass(div, (this.username2 == message.sender) ? 'right-msg' : 'left-msg')
      this.renderer.addClass(div2, 'msg-img')
      this.renderer.addClass(div3, 'msg-bubble')
      this.renderer.addClass(div4, 'msg-info')
      this.renderer.addClass(div5, 'msg-info-name')
      this.renderer.addClass(div6, 'msg-info-time')
      this.renderer.addClass(div7, 'msg-text')


      const parent = document.getElementById("chat-log") as HTMLInputElement
      this.renderer.insertBefore(parent, div, this.renderer.nextSibling(div));
    }
  }


  scrollToBottom(): void {
    console.log('hello')
    try {this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;} catch(err){

    }
}

}
