import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceFullName } from '../_shared/constants';
import { MessageService } from 'primeng/api';
import { IpService } from '../_shared/services/ip.service';
import { ErrorMsg } from '../_shared/constants/error-message';

@Component({
  selector: 'comp-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
  providers: [MessageService],
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
    private _messageService: MessageService
  ) {
    this.store = this._fb.group({
      id: ['', Validators.required],
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

  toResult() {
    if (!this.store.valid) {
      this.addToastError(ErrorMsg.required('Store ID'));
      return;
    }
    try {
      const devices = this._ipService.createDevicesOfStores(
        this.storeId,
        this.store.value
      );
      if (devices[0].devices.length === 0) {
        this.addToastError(ErrorMsg.atLeastOne());
        return;
      }
      this._router.navigateByUrl('/result', {
        state: { storeId: this.storeId, data: devices },
      });
    } catch (error: any) {
      this.addToastError(error.message);
    }
  }

  addToastError(error: string) {
    this._messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
    });
  }

  clear() {
    this._messageService.clear();
  }
}
