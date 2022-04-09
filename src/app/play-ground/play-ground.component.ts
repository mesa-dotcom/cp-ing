import { Component, OnInit } from '@angular/core';
import {
  interval,
  mergeMap,
  Subscription,
} from 'rxjs';
import { PingService } from '../_shared/services/ping.service';

@Component({
  selector: 'comp-play-ground',
  templateUrl: './play-ground.component.html',
  styleUrls: ['./play-ground.component.css'],
})
export class PlayGroundComponent implements OnInit {
  public isPinging: boolean = false;
  public isContinuous: boolean = false;
  public ipTest: string = '';
  public resultSubscription: Subscription = new Subscription()
  public results: string[] = []

  constructor(private _pingService: PingService) {
  }

  ngOnInit(): void {
  }

  start() {
    if (this.ipTest !== '') {
      this.isPinging = true
      this.pingContinuously ? this.pingContinuously() : void 0
    }
  }

  pingContinuously() {
    this.resultSubscription = interval(1000).pipe(
      mergeMap(() => this._pingService.ping(this.ipTest)),
    ).subscribe(
      (result) => {
        this.results.push(result)
      }
    )
  }

  stop() {
    this.isPinging = false
    this.resultSubscription.unsubscribe()
  }

  clear() {
    this.results = []
  }
}
