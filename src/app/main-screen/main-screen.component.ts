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
  constructor(private _ipService: IpService, private _builder: FormBuilder) {
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

  ping() {
    if (this.storeId.length === 4 || this.storeId.length === 5) {
      console.table(
        this._ipService.createDevices(this.storeId, this.store.value)
      );
    }
  }
}
