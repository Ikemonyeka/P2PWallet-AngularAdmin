import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private auth: AdminAuthService, private router: Router) {
    
  }

  canActivate():boolean{
    if(this.auth.isLoggedIn()){
      return true
    }
    else{
      this.router.navigate(['admin-login'])
      return false
    }
  }
}
