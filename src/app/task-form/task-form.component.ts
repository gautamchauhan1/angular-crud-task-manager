import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges  {

  taskForm!: FormGroup;
  constructor(private fb: FormBuilder, private taskService: TaskService, private notification: NotificationService){
  this.initForm();
  }

  @Output() taskAdded = new EventEmitter<void>();
  @Input() taskData: any;
  editId: any = null;

  ngOnInit(): void {
  }
    
  ngOnChanges(changes: SimpleChanges): void {

      if(this.taskData && this.taskForm)
    {
      this.taskForm.patchValue(this.taskData);
      this.editId = this.taskData.id;
    }
   
  }

  cancelForm(){
    this.taskAdded.emit();
  }

  initForm(){
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      dueDate:['', Validators.required],
      priority: ['low', Validators.required],
      description: [''],
    })
  }

  resetTaskForm()
  {
        this.taskForm.reset({priority: 'low'});
        this.taskAdded.emit();
        this.taskData = null;
  }

  onSubmit(){
    if(this.taskForm.valid)
    {
        if(this.editId)
        {
          this.taskService.updateTask(this.editId, this.taskForm.value).subscribe({
            next:(res)=>
            {
              this.notification.showSuccess('Task is Updated!');
              this.resetTaskForm();
              this.editId= null;
            }
          })
        }
        else
        {
                this.taskService.addTask(this.taskForm.value).subscribe({
        next: (res)=>
        {
          this.notification.showSuccess('Task successfully added!');
          this.resetTaskForm();
        },
        error: (err)=>
        {
          console.log(err); 
          this.notification.showError('Error while adding task');
        }
      })
        }
    }
  }

}
