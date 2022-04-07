import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    component: MainScreenComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
