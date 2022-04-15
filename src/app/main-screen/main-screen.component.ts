import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceFullName } from '../_shared/constants';
import { InputHandlerService } from '../_shared/services/input-handler.service';
import { IpService } from '../_shared/services/ip.service';

@Component({
  selector: 'comp-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
})
export class MainScreenComponent {
  public styleClass: { [key: string]: string } = {
    label: 'xl:col-1 lg:col-1 md:col-2 align-self-center',
    input: 'xl:col-2 lg:col-3 md:col-4',
  };
  public deviceFullName = DeviceFullName;
  public store: FormGroup;
  public upsOption: Array<{ name: string; value: number }> = [
    { name: '1', value: 1 },
    { name: '2', value: 2 },
  ];
  constructor(
    private _ipService: IpService,
    private _fb: FormBuilder,
    private _router: Router,
  ) {
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

  clearInput() {
    this.store.reset();
    this.store.controls['id'].setValue('');
  }

  ping() {
    try {
      const devices = this._ipService.createDevicesOfStores(
        this.storeId,
        this.store.value
      );
      this._router.navigateByUrl('/result', {
        state: { storeId: this.storeId, data: devices },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
