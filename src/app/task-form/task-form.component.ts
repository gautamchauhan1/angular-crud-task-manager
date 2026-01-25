import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CanComponentDeactivate } from '../interfaces/can-component-deactivate';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, CanComponentDeactivate  {

  taskForm!: FormGroup;
  constructor(
    private fb: FormBuilder, 
    private taskService: TaskService, 
    private notification: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  
  ){
  this.initForm();
  }

  canExit(): boolean{
if(this.isFormDirty){
  return confirm('⚠️ You have unsaved changes! Do you really want to leave?')
}
return true;
  }
  taskID: any = null;
  isEditMode = false;
  isFormDirty: boolean = false;

  markAsDirty() {
    this.isFormDirty = true;
  }

  ngOnInit(): void {
    const data = this.route.snapshot.data['taskData'];
    if(data)
    {
      this.isEditMode = true;
      this.taskID = data.id;
      this.taskForm.patchValue(data);
    }
  }

  initForm(){
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      dueDate:['', Validators.required],
      priority: ['low', Validators.required],
      description: [''],
    })
  }


  onSubmit()
  {
    if(this.taskForm.valid)
    {
      if(this.isEditMode)
      {
        this.taskService.updateTask(this.taskID, this.taskForm.value).subscribe({
          next:()=>
          {
            this.notification.showSuccess('Task Updated!');
            this.router.navigate(['/tasks']);
            this.isFormDirty = false
          },
          error: (err)=>
          {
            console.log(err);
            this.notification.showError('Error Updating Task');
            
          }
        })
      }
      else{
        this.taskService.addTask(this.taskForm.value).subscribe({
          next:()=>
          {
            this.notification.showSuccess('Task Added!');
            this.router.navigate(['/tasks']);
            this.isFormDirty = false;
          },
          error:(err)=> {
            this.notification.showError('Error adding task!');
            console.log(err);
            
          }
        })        
      }
    }
    else{
      this.taskForm.markAllAsTouched();
    }
  }

}
