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
import { MainScreenComponent } from './main-screen/main-screen.component';

import PRIMENG_MODULE from './modules/prime-ng';
import { ResultComponent } from './result/result.component';
import { PlayGroundComponent } from './play-ground/play-ground.component';
import { SettingComponent } from './_shared/components/setting/setting.component';
import { OnlyNCDDirective } from './_shared/directives/only-ncd.directive';
import { InputFormComponent } from './_shared/components/input-form/input-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainScreenComponent,
    ResultComponent,
    PlayGroundComponent,
    SettingComponent,
    OnlyNCDDirective,
    InputFormComponent,
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
