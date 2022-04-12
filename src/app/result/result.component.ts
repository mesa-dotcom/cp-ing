import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceFullName } from '../_shared/constants';
import { Device } from '../_shared/models';
import { PingService } from '../_shared/services/ping.service';
@Component({
  selector: 'comp-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  public storeId = '30001';
  public deviceFullName = DeviceFullName;
  public ipsDevices: Device[] = [];
  public results: any[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _pingService: PingService
  ) {
    this.ipsDevices =
      this._router.getCurrentNavigation()?.extras?.state?.['data'] || [];
    this.ipsDevices.forEach((d) => {
      this.results.push({
        device: d.type,
        ip: d.ip,
        no: d.no,
        results: [],
      });
    });
  }

  ngOnInit(): void {
    if (this.ipsDevices.length === 0) {
      this._router.navigateByUrl('/');
    }
  }
}
