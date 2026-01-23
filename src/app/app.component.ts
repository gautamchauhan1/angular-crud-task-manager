import { Component } from '@angular/core';
import { Task } from './models/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-app';

  showForm: boolean = false;

  taskToEdit: any = null;
  
  openForm(){
    this.taskToEdit = null;
    this.showForm = true;
  }

    closeForm(){
    this.showForm = false;
  }

  onEditTask(task: Task){
    this.taskToEdit = task;
    this.showForm = true;
  }

}
