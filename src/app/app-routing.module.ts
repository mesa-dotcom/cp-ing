import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { PlayGroundComponent } from './play-ground/play-ground.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path: '',
    component: MainScreenComponent,
  },
  {
    path: 'result',
    component: ResultComponent,
  },
  {
    path: 'play-ground',
    component: PlayGroundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
