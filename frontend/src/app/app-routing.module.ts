import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { CoursesPageComponent } from './components/pages/courses-page/courses-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { DetailsPageComponent } from './components/pages/details-page/details-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { AvisPageComponent } from './components/pages/avis-page/avis-page.component';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';

const routes: Routes = [
  {path:"",component:HomePageComponent},
  {path:"register",component:RegisterPageComponent},
  {path:"login",component:LoginPageComponent},
  {path:"courses",component:CoursesPageComponent},
  {path:"courses/:id",component:DetailsPageComponent},
  {path:"profile",component:ProfilePageComponent},
  {path:"contact",component:ContactPageComponent},
  {path:"cart-page",component:CartPageComponent, canActivate: [AuthGuard] },
  {path:"avis",component:AvisPageComponent, canActivate: [AuthGuard]},
  {path:"dashboard",component:DashboardPageComponent},
  {path:"about",component:AboutPageComponent},

  { path: '**', redirectTo: '/login' } 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
