import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit  {

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

  taskID: any = null;
  isEditMode = false;

  ngOnInit(): void {
    this.taskID = this.route.snapshot.paramMap.get('id');

    if(this.taskID)
    {
      this.isEditMode = true;
      this.getTaskById(this.taskID);

    }
  }

  getTaskById(id:any){
    this.taskService.getTasks().subscribe({
      next:(allTasks)=>
      {
        const task = allTasks.find((t:any)=> t.id == id);
        if(task)
        {
          this.taskForm.patchValue(task);
        }
      },
      error:()=>
      {
        this.notification.showError('Task not found');
      }
    })
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
