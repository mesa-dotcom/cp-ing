import { Component, OnInit } from '@angular/core';
import { DeviceFullName } from '../_shared/constants';
import { DeviceType } from '../_shared/enums';
import { Device } from '../_shared/models';
import { IpService } from '../_shared/services/ip.service';

@Component({
  selector: 'comp-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  public store: string = ''
  public deviceFullName = DeviceFullName
  public pickedDevices: Device[] = [
    {
      type: DeviceType.GW,
      No: null,
      ip: ''
    },
    {
      type: DeviceType.SC,
      No: null,
      ip: ''
    },
    {
      type: DeviceType.POS,
      No: 1,
      ip: ''
    },
    {
      type: DeviceType.POS,
      No: 2,
      ip: ''
    },
    {
      type: DeviceType.POS,
      No: 3,
      ip: ''
    },
    {
      type: DeviceType.PRINTER,
      No: 1,
      ip: ''
    },
    {
      type: DeviceType.GOT,
      No: 1,
      ip: '',
    },
    {
      type: DeviceType.AP,
      No: 1,
      ip: ''
    },
    {
      type: DeviceType.AP,
      No: 2,
      ip: ''
    },
    {
      type: DeviceType.PDA,
      No: 1,
      ip: ''
    },
    {
      type: DeviceType.UPS,
      No: 1,
      ip: ''
    },
    {
      type: DeviceType.CCTV,
      No: 1,
      ip: ''
    },
    {
      type: DeviceType.EDC,
      No: 1,
      ip: ''
    }
  ]
  constructor(private _ipService: IpService) { }

  ngOnInit(): void {
  }

  changePickedDevices() {
  }

  ping() {
    if (this.store.length > 3) {
      const fullStoreId = this.store.length === 4 ? '7' + this.store : this.store
      this.pickedDevices = this._ipService.generateIPs(fullStoreId, this.pickedDevices)
    }
  }

}
