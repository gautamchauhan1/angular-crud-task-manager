import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {

  constructor(
    private taskService: TaskService, 
    private authService: AuthService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ){}
  
  @ViewChild(MatSort) htmlSort!: MatSort;
  @ViewChild(MatPaginator) htmlPaginator!: MatPaginator;

    ngAfterViewInit(): void {
    this.dataSource.sort = this.htmlSort;
    this.dataSource.paginator = this.htmlPaginator;
  }

  allTasksBackup: any [] =[];
  dataSource = new MatTableDataSource<any>(); // replace this instead of array
  displayedColumns: string[] = ['title', 'priority', 'dueDate', 'actions'];


  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(){
    this.taskService.getTasks().subscribe({
      next: (res)=>
      {
        this.allTasksBackup= res;
        this.dataSource.data = res;
        this.listenToQueryParams();
        // after coming data, connects sort and paginator to html DOM
        this.dataSource.sort = this.htmlSort;
        this.dataSource.paginator = this.htmlPaginator;
      },
      error: (err)=>
      {
        console.log(err);
        alert('Error, while fetching Data...');
        
      }
    })
  }

  listenToQueryParams(){
    this.route.queryParams.subscribe(params=>
    {
      const p = params['priority'];

      if(p){
        const filtered = this.allTasksBackup.filter(t=> t.priority.toLowerCase() === p.toLowerCase());
        this.dataSource.data = filtered;
      } else {
        this.dataSource.data = this.allTasksBackup;
      }
    }
    )
  }

  updateURLFilter(priorityVal: string | null){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {priority: priorityVal},
      queryParamsHandling: 'merge' // put old params if there is any
    })
  }

  deleteTask(id:number){
    if(confirm('Are you sure, you want to delete this task?')){

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
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['/login'])
  }


}
