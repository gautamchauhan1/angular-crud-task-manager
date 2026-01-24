import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {

  constructor(
    private taskService: TaskService, 
    private notification: NotificationService,
    private authService: AuthService
  ){}
  
  @ViewChild(MatSort) htmlSort!: MatSort;
  @ViewChild(MatPaginator) htmlPaginator!: MatPaginator;

    ngAfterViewInit(): void {
    this.dataSource.sort = this.htmlSort;
    this.dataSource.paginator = this.htmlPaginator;
  }

  dataSource = new MatTableDataSource<any>(); // replace this instead of array

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

  logout(){
    this.authService.logout();
  }

}
