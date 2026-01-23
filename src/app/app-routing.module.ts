import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //lazy loading Syntax
  {path: 'tasks', loadChildren: ()=> import('./tasks/tasks.module').then(m=> m.TasksModule)},
  // if user open only 'localhost:4200'
  {path:'', redirectTo:'tasks', pathMatch:'full'},
  // wildcard route, if user enter wrong url
  {path: '**', redirectTo:'tasks'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
