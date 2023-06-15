import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  private messageSource = new BehaviorSubject<string>('service');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient,) { }

  changeMessage(message:string){
    this.messageSource.next(message)
    console.log(message)
  }

  getMessages(): Observable<any> {
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
      headers: new HttpHeaders(headers2)
    }
    const url: string = `http://127.0.0.1:8001/chat/feed`
    return this.http.get(url, requestoption)
  }

  getToken(): Observable<any> {
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
      headers: new HttpHeaders(headers2)
    }
    const url: string = `http://127.0.0.1:8001/get_agora/`
    return this.http.get(url, requestoption)
  }

  postMessage(data: any): Observable<any> {
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
      headers: new HttpHeaders(headers2)
    }
    const url: string = 'http://127.0.0.1:8001/chat/feed/'
    return this.http.post<any>(url, data, requestoption)
  }

  async getVideoToken(text: string) {
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
      headers: new HttpHeaders(headers2)
    }
    const url: string = `http://127.0.0.1:8001/video/get_agora/?channel=${text}`
    const data: any = await lastValueFrom(this.http.get(url, requestoption))
    return data
  }



}
