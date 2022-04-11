import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobFormComponent } from './views/job-form/job-form.component';
import { JobListComponent } from './views/job-list/job-list.component';
import { UserFormComponent } from './views/user-form/user-form.component';
import { UserListComponent } from './views/user-list/user-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/user', pathMatch: 'full' },
  { path: 'user', component: UserListComponent },
  { path: 'user/create', component: UserFormComponent },
  { path: 'user/:id', component: UserFormComponent },
  { path: 'job', component: JobListComponent },
  { path: 'job/create', component: JobFormComponent },
  { path: 'job/:id', component: JobFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
