import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  /**
   * get assignment data from server
   * @returns assignment data
   */
  getAssignment():Observable<any>{
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
        headers : new HttpHeaders(headers2)
    }
    const url2:string = `http://127.0.0.1:8000/assignments/`
    return this.http.get( url2, requestoption)
  }

  /**
   *
   * @param id assignment id
   * @returns assignment detail data
   */
  getAssignmentDetail(id:any):Observable<any>{
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
        headers : new HttpHeaders(headers2)
    }
    const url2:string = `http://127.0.0.1:8000/assignments/${id}`
    return this.http.get( url2, requestoption)
  }

  /**
   * send new assignment creation request
   * to server
   * @param assignment assignment data
   */
  createAssignment(assignment:any):Observable<any>{
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
        headers : new HttpHeaders(headers2)
    }
    const url2:string = 'http://127.0.0.1:8000/assignments/'
    return this.http.post<any>( url2, assignment, requestoption)
  }

  /**
   * send new  graded assignment creation request
   * to server
   * @param assignment graded assignment data
   */
  createdGradedAssignment(assignment:any):Observable<any>{
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
        headers : new HttpHeaders(headers2)
    }
    const url2:string = 'http://127.0.0.1:8000/scores/create/'
    return this.http.post<any>( url2, assignment, requestoption)
  }

  /**
   * get user graded score
   * @param email user email
   * @returns user graded score
   */
  getGradedAssignment(email:any):Observable<any>{
    const headers2 = {
      'Content-Type': 'application/json',
    }
    const requestoption = {
        headers : new HttpHeaders(headers2)
    }
    const url2:string = `http://127.0.0.1:8000/scores/?email=${email}`
    return this.http.get( url2, requestoption)
  }

}
