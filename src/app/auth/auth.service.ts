import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): boolean {
    if(username ==='admin' && password==='123')
    {
    localStorage.setItem('token', 'jwt-fake-token-123');
    return true;
    }
    return false
  }

  logOut(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

}
