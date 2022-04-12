import { Component, OnInit } from '@angular/core';
import { interval, mergeMap, Subscription, switchMap } from 'rxjs';
import { PingService } from '../_shared/services/ping.service';

@Component({
  selector: 'comp-play-ground',
  templateUrl: './play-ground.component.html',
  styleUrls: ['./play-ground.component.css'],
})
export class PlayGroundComponent implements OnInit {
  public isPinging: boolean = false;
  public isContinuous: boolean = false;
  public ipTest: string = '127.0.0.1';
  public resultSubscription: Subscription = new Subscription();
  public resultsDisplay: string[] = [];

  constructor(private _pingService: PingService) {}

  ngOnInit(): void {}

  start() {
    if (this.ipTest === '') return;
    this.isPinging = true;
    this.isContinuous ? this.pingContinuously() : this.pingNormally();
  }

  pingNormally() {
    this.resultSubscription = this._pingService.ping(this.ipTest).subscribe({
      next: (res: any) => {
        this.resultsDisplay.push(res.display);
      },
      complete: () => {
        this.isPinging = false;
      },
    });
  }

  pingContinuously() {
    this.resultSubscription = this._pingService
      .pingContinuously(this.ipTest)
      .subscribe((x: any) => {
        this.resultsDisplay.push(x.display);
      });
  }

  stop() {
    this.isPinging = false;
    this.resultSubscription.unsubscribe();
  }

  clear() {
    this.resultsDisplay = []
  }
}
