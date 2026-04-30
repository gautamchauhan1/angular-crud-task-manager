import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  //this method is for interceptor
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //login method, this will set fake token
  login(username: string, password: string){
    if(username==='admin' && password==='1234')
    {
    localStorage.setItem('token', 'fake-jwt-token-123');
    this.router.navigate(['/tasks']);
    }
    else
    {
      alert('Invalid credentials');
    }
    
  }

  logout(){
    localStorage.removeItem('token'); // delete token
    this.router.navigate(['/login'])
  }

  isLoggedIn(): boolean {
    //if token present, return true, otherwise false.
    return !!localStorage.getItem('token');
  }
}
