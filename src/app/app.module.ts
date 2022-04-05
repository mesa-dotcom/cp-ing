import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './_shared/components/footer/footer.component';
import { HeaderComponent } from './_shared/components/header/header.component';
import { GitIgnoreDirective } from './_shared/directives/git-ignore.directive';
import { MainScreenComponent } from './main-screen/main-screen.component';

import PRIMENG_MODULE from './modules/prime-ng';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    GitIgnoreDirective,
    MainScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...PRIMENG_MODULE
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
