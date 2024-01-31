import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { InitComponent } from './init/init.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupsComponent } from './groups/groups.component';
import { AppsComponent } from './apps/apps.component';

export const routes: Routes = [
  { path: 'init', component: InitComponent },
  { path: '', redirectTo: 'init', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'groups', component: GroupsComponent },
      { path: 'apps', component: AppsComponent }],
  },

  { path: '**', component: NotFoundComponent },
];
