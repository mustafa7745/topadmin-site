import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { InitComponent } from './init/init.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupsComponent } from './groups/groups.component';
import { AppsComponent } from './apps/apps.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { AppsGroupsComponent } from './apps-groups/apps-groups.component';
import { PermissionsGroupsComponent } from './permissions-groups/permissions-groups.component';
import { RsaComponent } from './rsa/rsa.component';

export const routes: Routes = [
  { path: 'init', component: InitComponent },
  { path: '', redirectTo: 'init', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'groups', component: GroupsComponent ,children:[
       
      ]},
      { path: 'permissions', component: PermissionsComponent },
      { path: 'rsa', component: RsaComponent },

      // { path: 'apps/:id', component: AppsComponent },
      { path: 'apps', component: AppsComponent },
      {path: 'groups/apps-group', component: AppsGroupsComponent},
      {path: 'groups/permissions-group', component: PermissionsGroupsComponent}
    ],
      
  },

  { path: '**', component: NotFoundComponent },
];
