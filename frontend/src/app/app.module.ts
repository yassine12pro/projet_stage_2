import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { StarratingComponent } from './components/partials/starrating/starrating.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { CoursesPageComponent } from './components/pages/courses-page/courses-page.component';
import { ContactPageComponent } from './components/pages/contact-page/contact-page.component';
import { AboutPageComponent } from './components/pages/about-page/about-page.component';
import { DetailsPageComponent } from './components/pages/details-page/details-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { LoadingInterceptor } from './shared/interseptors/loading.interceptor';
import { AvisPageComponent } from './components/pages/avis-page/avis-page.component';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // <-- Importez FormsModule
import { MatIconModule } from '@angular/material/icon';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RegisterPageComponent,
    HeaderComponent,
    FooterComponent,
    StarratingComponent,
    LoginPageComponent,
    CoursesPageComponent,
    ContactPageComponent,
    AboutPageComponent,
    DetailsPageComponent,
    CartPageComponent,
    NotFoundComponent,
    LoadingComponent,
    AvisPageComponent,
    DashboardPageComponent,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatIconModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,useClass:LoadingInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
