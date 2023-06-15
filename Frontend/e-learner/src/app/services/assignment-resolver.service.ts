import { AssignmentService } from './assignment.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AssignmentResolverService implements Resolve<any> {

  constructor(
    private as: AssignmentService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<any> {
    return null as any
  }

}
