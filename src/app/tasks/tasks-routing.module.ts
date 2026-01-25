import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { unsavedChangesGuard } from '../guards/unsaved-changes.guard';
import { taskResolver } from '../resolvers/task.resolver';

const routes: Routes = [
  {path:'', component: TaskListComponent},
  {path:'add', component: TaskFormComponent, canDeactivate:[unsavedChangesGuard]},
  {path:'edit/:id', component: TaskFormComponent, canDeactivate:[unsavedChangesGuard], resolve:{taskData: taskResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
