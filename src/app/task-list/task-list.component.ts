import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(private taskService: TaskService, private notification: NotificationService){}


  @Output() editRequest = new EventEmitter<any>();
  // tasks: Task[] = [];

  @ViewChild(MatSort) htmlSort!: MatSort;
  @ViewChild(MatPaginator) htmlPaginator!: MatPaginator;

    ngAfterViewInit(): void {
    this.dataSource.sort = this.htmlSort;
    this.dataSource.paginator = this.htmlPaginator;
  }

  dataSource = new MatTableDataSource<any>(); // replace this instead of array

  ngOnChanges(changes: SimpleChanges): void {
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

 
  displayedColumns: string[] = ['title', 'priority', 'dueDate', 'actions'];

  getAllTasks(){
    this.taskService.getTasks().subscribe({
      next: (res)=>
      {
        this.dataSource.data = res;
        // after coming data, connects sort and paginator to html DOM
        this.dataSource.sort = this.htmlSort;
        this.dataSource.paginator = this.htmlPaginator;
      },
      error: (err)=>
      {
        console.log(err);
        alert('Error');
        
      }
    })
  }

  deleteTask(id:any){
    this.taskService.deleteTask(id).subscribe({
      next:()=>{
      this.notification.showSuccess('Deleted!');
      this.getAllTasks();
      },

      error: (err)=>
      {
        console.log(err);
        this.notification.showError('error while deleting');
      }

    })
  }

  editTask(task: Task){
   this.editRequest.emit(task);
  }

}
