import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DeviceFullName } from '../_shared/constants';
import { PingService } from '../_shared/services/ping.service';
@Component({
  selector: 'comp-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  public storeId = '30001';
  public deviceFullName = DeviceFullName;
  public ipsDevices: any[] = []
  public results: any[] = [
    {
      device: 'SC',
      no: '-',
      ip: '113.100.101.119',
    },
  ];
  constructor(private _router: Router, private _route: ActivatedRoute, private _pingService: PingService) {
    this.ipsDevices = this._router.getCurrentNavigation()?.extras?.state?.['data'] || [];
  }

  ngOnInit(): void {
    if (this.ipsDevices.length === 0) {
      this._router.navigateByUrl('/');
    }
  }
}
