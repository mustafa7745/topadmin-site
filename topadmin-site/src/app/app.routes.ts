import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { InitComponent } from './init/init.component';

export const routes: Routes = [
    { path: 'init', component: InitComponent },
    { path: '', redirectTo: 'init', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    { path: '**', component: NotFoundComponent },
];
