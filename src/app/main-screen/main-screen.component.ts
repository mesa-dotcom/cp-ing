import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeviceFullName } from '../_shared/constants';
import { DeviceType } from '../_shared/enums';
import { Device } from '../_shared/models';
import { InputHandlerService } from '../_shared/services/input-handler.service';
import { IpService } from '../_shared/services/ip.service';

@Component({
  selector: 'comp-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
})
export class MainScreenComponent implements OnInit {
  public deviceFullName = DeviceFullName;
  public store: FormGroup;
  public cctvOption: any[] = [1,2,3,4]
  public pickedDevices: Device[] = [
    {
      type: DeviceType.GW,
      No: null,
      ip: '',
    },
    {
      type: DeviceType.SC,
      No: null,
      ip: '',
    },
    {
      type: DeviceType.POS,
      No: 1,
      ip: '',
    },
    {
      type: DeviceType.POS,
      No: 2,
      ip: '',
    },
    {
      type: DeviceType.POS,
      No: 3,
      ip: '',
    },
    {
      type: DeviceType.PRINTER,
      No: 1,
      ip: '',
    },
    {
      type: DeviceType.GOT,
      No: 1,
      ip: '',
    },
    {
      type: DeviceType.AP,
      No: 1,
      ip: '',
    },
    {
      type: DeviceType.AP,
      No: 2,
      ip: '',
    },
    {
      type: DeviceType.PDA,
      No: 1,
      ip: '',
    },
    {
      type: DeviceType.UPS,
      No: 1,
      ip: '',
    },
    {
      type: DeviceType.CCTV,
      No: 1,
      ip: '',
    },
    {
      type: DeviceType.EDC,
      No: 1,
      ip: '',
    },
  ];
  constructor(
    private _ipService: IpService,
    private _inputHandlerService: InputHandlerService,
    private _builder: FormBuilder
  ) {
    this.store = this._builder.group({
      id: '',
      gw: false,
      sc: true,
      got: false,
      pos: '1-3',
      ap: '1,2',
      pda: '1,2',
      printer: '1',
      ups: '1',
      cctv: '1',
      edc: '',
    });
  }

  get storeId() {
    return this.store.controls['id'].value;
  }

  ngOnInit(): void {}

  changePickedDevices() {}

  ping() {
    if (this.storeId.length > 3) {
      const fullStoreId =
        this.storeId.length === 4 ? '7' + this.storeId : this.storeId;
      this.pickedDevices = this._ipService.generateIPs(
        fullStoreId,
        this.pickedDevices
      );
    }
  }
}
