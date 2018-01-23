import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { ProfileComponent } from './components/profile/profile.component';

// Our Array of Angular 2 Routes
const appRoutes: Routes =
[
	{
		path: '',
    	component: HomeComponent // Default Route
	},
	{
	    path: 'dashboard',
	    component: DashboardComponent, // Dashboard Route,
	    //canActivate: [AuthGuard] // User must be logged in to view this route
 	},
 	{
	    path: 'register',
	    component: RegisterComponent, // Register Route
	    //canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  	},
  	{
	    path: 'about',
	    component: AboutComponent, // About Route
	    //canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  	},
  	{
	    path: 'profile',
	    component: ProfileComponent, // Profile Route
	    //canActivate: [NotAuthGuard] // User must NOT be logged in to view this route
  	},

	{ path: '**', component: HomeComponent } // "Catch-All" Route
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  providers: [],
  bootstrap: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
