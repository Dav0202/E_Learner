import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, shareReplay, map } from 'rxjs/operators';
import { JwtToken } from './jwt-token';
import decode from 'jwt-decode';
import * as CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})
export class NewUserService {
  encryptMode: boolean
  textToConvertstudent!: any;
  textToConverteducator!: any;
  decrypttextToConvertstudent!: any;
  decrypttextToConverteducator!: any;
  private password!: any;
  conversionOutputstudent!: any;
  conversionOutputeducator!: any;
  conversionOutputemail!: any;
  decryptconversionOutputstudent!: any;
  decryptconversionOutputeducator!: any;
  decryptconversionOutputemail!: any;
  conversionOutputusername!: any;
  decryptconversionOutputusername!: any;

  constructor(
    private http: HttpClient,
    private cookie: CookieService,
    private router: Router
  ) {
    this.encryptMode = true
  }

  private jwtToken!: JwtToken

  /**
   * Sends login information to api
   * @param user user login information
   * @returns Access token as observable
   */
  login(user: any): Observable<any> {
    const url: string = 'http://127.0.0.1:8000/user/login/'
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
      headers: new HttpHeaders(headers2)
    }
    return this.http.post<any>(url, user, httpOptions).pipe(
      map(
        res => {
          this.setText()
          this.jwtToken = decode(res.access)
          localStorage.setItem('Token', res.access)
          this.encryptMode = true;
          this.conversionOutputemail = CryptoJS.AES.encrypt(JSON.stringify(this.jwtToken.email), this.cookie.get("RTY_ft")).toString();
          this.conversionOutputeducator = CryptoJS.AES.encrypt(JSON.stringify(this.jwtToken.educator), this.cookie.get("RTY_ft")).toString();
          this.conversionOutputstudent = CryptoJS.AES.encrypt(JSON.stringify(this.jwtToken.student), this.cookie.get("RTY_ft")).toString();
          this.conversionOutputusername = CryptoJS.AES.encrypt(JSON.stringify(this.jwtToken.username), this.cookie.get("RTY_ft")).toString();
          this.cookie.set('student', this.conversionOutputstudent);
          this.cookie.set('educator', this.conversionOutputeducator);
          this.cookie.set('oYkhyT', this.conversionOutputemail); //email
          this.cookie.set('tHjgy', this.conversionOutputusername);
          this.router.navigate(['/', 'homepage'])
        }
      )
    )
  }


  /**
   * get token from local storage
   * @returns token
   */
  public getToken(): string | null | undefined | void {
    let token = localStorage.getItem('Token');
    if (token) {
      return localStorage.getItem('Token');
    }
  }

  /**
   * check if token exist in local storage
   * @returns boolean value
   */
  islogged(){
    let token = localStorage.getItem('Token');
    if (token) {
      return true
    }
    return false
  }

  /**
   * Removes token and cookies from browser
   */
  logout(){
    localStorage.clear()
    this.cookie.delete('RTY_ft')
    this.cookie.delete('student')
    this.cookie.delete('educator')
    this.cookie.delete('oYkhyT')
    this.cookie.delete('tHjgy')
    location.reload()
    this.router.navigate(['/', 'homepage'])
  }


  /**
   * set decryption password
   */
  setText() {
    this.cookie.set('RTY_ft', uuidv4())
  }

  /**
   * Decrypts encrypted cookie
   * @returns dictionary of values
   */
  toDecryptStudentEducator() {
    this.encryptMode = false;
    this.decryptconversionOutputstudent = CryptoJS.AES.decrypt(this.cookie.get("student"),
      this.cookie.get("RTY_ft")).toString(CryptoJS.enc.Utf8);
    this.decryptconversionOutputeducator = CryptoJS.AES.decrypt(this.cookie.get("educator"),
      this.cookie.get("RTY_ft")).toString(CryptoJS.enc.Utf8);
    this.decryptconversionOutputemail = CryptoJS.AES.decrypt(this.cookie.get("oYkhyT"),
      this.cookie.get("RTY_ft")).toString(CryptoJS.enc.Utf8);
    return {
      'educator': this.decryptconversionOutputeducator,
      'student': this.decryptconversionOutputstudent,
      'email': this.decryptconversionOutputemail
    }
  }

  toDecryptusername() {
    this.encryptMode = false;
    this.decryptconversionOutputusername = CryptoJS.AES.decrypt(this.cookie.get("tHjgy"),
      this.cookie.get("RTY_ft")).toString(CryptoJS.enc.Utf8);

      let username2 = this.decryptconversionOutputusername
      username2 = username2.replace(/"/g, '');
      this.cookie.set('username', username2 )
  }

  /**
   * Refresh access token from api
   * @returns returns new access token
   */
  refreshToken() {
    console.log('Access Token expired Refresh begin')
    return this.http.post<any>('http://127.0.0.1:8000/user/login/refresh/', {}, { withCredentials: true })
      .pipe(map((res) => {
        this.jwtToken = decode(res.access)
        localStorage.setItem('Token', res.access)
        location.reload()
      }));

  }

  /**
   * check if user is teacher
   * @returns boolean value
   */
  setteacher(){
    let decryptcookies = this.toDecryptStudentEducator()
    if (decryptcookies.educator === "true" && decryptcookies.student === "false") {
      return true
    }
    return false
  }

  /**
   * check if user is student
   * @returns boolean value
   */
  setstudent(){
    let decryptcookies = this.toDecryptStudentEducator()
    if (decryptcookies.educator === "false" && decryptcookies.student === "true") {
      return true
    }
    return false
  }

}
