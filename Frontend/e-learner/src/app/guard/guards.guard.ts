import { NewUserService } from './../services/new-user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GuardsGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: NewUserService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.authService.islogged()) {
          this.router.navigate(['/login']);
          return false;
        } else {
          return true;
        }

  }

}
