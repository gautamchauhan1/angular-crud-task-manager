import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient ) { }

  private apiUrl = 'http://localhost:3000/tasks';

  getTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl)
  }

  addTask(task: Task):Observable<Task>{
    return this.http.post<Task>(this.apiUrl, task)
  }

  deleteTask(id:any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateTask(id: any, task: Task): Observable<Task>{
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
  }
  
}
