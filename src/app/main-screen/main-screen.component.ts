import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DeviceFullName } from '../_shared/constants';
import { DeviceType } from '../_shared/enums';
import { Device } from '../_shared/models';
import { IpService } from '../_shared/services/ip.service';

@Component({
  selector: 'comp-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
})
export class MainScreenComponent implements OnInit {
  public deviceFullName = DeviceFullName;
  public store: FormGroup;
  upsOption: Array<{name: string, value: number}> = [
    { name: '1', value: 1 },
    { name: '2', value: 2 },
  ];
  constructor(private _ipService: IpService, private _fb: FormBuilder) {
    this.store = this._fb.group({
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

  get ups() {
    return this.store.controls['ups'].value;
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
