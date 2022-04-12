import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { concat, concatMap, forkJoin, map, Observable, of, zip } from 'rxjs';
import { DeviceABBR, DeviceFullName } from '../_shared/constants';
import { DeviceType } from '../_shared/enums';
import { Device } from '../_shared/models';
import { PingService } from '../_shared/services/ping.service';

const PING_TIMES = 4;
@Component({
  selector: 'comp-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  public storeId: string = '30001';
  public deviceAbbr = DeviceABBR;
  public deviceFullName = DeviceFullName;
  public ipsDevices: Device[] = [];
  public results: {
    device: DeviceType;
    storeId: string,
    ip: string;
    no?: number | null;
    res: any[];
  }[] = [];
  constructor(private _router: Router, private _pingService: PingService) {
    this.storeId =
      this._router.getCurrentNavigation()?.extras?.state?.['storeId'] || '';
    this.ipsDevices =
      this._router.getCurrentNavigation()?.extras?.state?.['data'] || [];
    this.ipsDevices.forEach((d) => {
      this.results.push({
        device: d.type,
        storeId: this.storeId,
        ip: d.ip,
        no: d.no,
        res: ['pending', 'pending', 'pending', 'pending'],
      });
    });
  }

  ngOnInit(): void {
    if (this.ipsDevices.length === 0) {
      this._router.navigateByUrl('/');
    }
    this.pingAll()
  }

  pingAll() {
    this.results.forEach((r) => {
      this._pingService.ping(r.ip).subscribe({
        next: (res: any) => {
          r.res[0] = res.all.alive ? 'success' : 'failed';
        },
      })
      this._pingService.ping(r.ip).subscribe({
        next: (res: any) => {
          r.res[1] = res.all.alive ? 'success' : 'failed';
        },
      })
      this._pingService.ping(r.ip).subscribe({
        next: (res: any) => {
          r.res[2] = res.all.alive ? 'success' : 'failed';
        },
      })
      this._pingService.ping(r.ip).subscribe({
        next: (res: any) => {
          r.res[3] = res.all.alive ? 'success' : 'failed';
        },
      })
    });
  }
}
