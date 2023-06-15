import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  constructor(private http: HttpClient,
    ) {}

  /**
   * get material data from server
   * @returns material data
   */
  getmaterial(): Observable<any>{
    return this.http.get<any>('http://127.0.0.1:8000/materials/')
  }

  /**
   * upload data to server
   * @param formData data to upload
   * @returns progress report
   */
  postdata(formData:any): Observable<any>{
    return this.http.post('http://18.204.11.246:5000/materials/', formData, {
      reportProgress: true,
      observe: 'events'
  })
  }
}
