import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './service/auth.service';
import {User} from './model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private user: User;

  constructor(private authService: AuthService, private router: Router) {
    this.user = authService.user;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.user == null) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }

  }
}
