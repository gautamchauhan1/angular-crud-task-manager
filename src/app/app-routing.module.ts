import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent},
    //lazy loading Syntax
  {path: 'tasks', loadChildren: ()=> import('./tasks/tasks.module').then(m=> m.TasksModule), canActivate:[authGuard]},
  {path:'', redirectTo:'login', pathMatch:'full'},
  // wildcard route, if user enter wrong url
  {path: '**', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
