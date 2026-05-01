import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService, private notification: NotificationService){}

  onLogin(username: string, password: string)
  {
    if(this.authService.login(username, password))
    {
          this.router.navigate(['/tasks']);
          this.notification.showSuccess('User loggedIn Successfully!');
    }

    else{
      this.notification.showError('Incorrect login credential');
    }
  }
}
