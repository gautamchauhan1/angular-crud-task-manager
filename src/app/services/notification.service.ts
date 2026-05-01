import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar ) { }

  showSuccess(message: string){
    this.snackBar.open(message, 'OK',{
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',

    })
  }

  showError(message: string){
    this.snackBar.open(message, 'Try Again' ,{
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    })
  }
}
