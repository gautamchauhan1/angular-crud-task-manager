import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';

export const taskResolver: ResolveFn<any> = (route, state) => {
  
  const taskService = inject(TaskService);
  const id = route.paramMap.get('id');
  if(id){
    return taskService.getTaskById(id);
  }
  return of(null);
};
