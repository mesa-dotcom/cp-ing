import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FooterComponent } from './_shared/components/footer/footer.component';
import { HeaderComponent } from './_shared/components/header/header.component';
import { GitIgnoreDirective } from './_shared/directives/git-ignore.directive';
import { MainScreenComponent } from './main-screen/main-screen.component';

import PRIMENG_MODULE from './modules/prime-ng';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    GitIgnoreDirective,
    MainScreenComponent,
    ResultComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ...PRIMENG_MODULE
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
