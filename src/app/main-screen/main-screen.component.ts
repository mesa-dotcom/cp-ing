import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DeviceFullName, UniqueDevices } from '../_shared/constants';
import { MessageService } from 'primeng/api';
import { IpService } from '../_shared/services/ip.service';
import { ErrorMsg } from '../_shared/constants/error-message';
import { Subscription } from 'rxjs';
import { SettingService } from '../_shared/services/setting.service';
import { DeviceType } from '../_shared/enums';

@Component({
  selector: 'comp-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css'],
  providers: [MessageService],
})
export class MainScreenComponent {
  public styleClass: { [key: string]: string } = {
    wrapper: 'xl:col-3 lg:col-4 md:col-6 grid align-items-center',
    label: 'xl:col-3 lg:col-4 md:col-6 align-self-center',
    input: 'xl:col-9 lg:col-8 md:col-6',
  };
  public deviceFullName = DeviceFullName;
  public uniqueDevices = UniqueDevices;
  public store: FormGroup;
  public setting: any = {
    gw: {
      show: true,
      default: false,
    },
    sc: {
      show: true,
      default: true,
    },
    got: {
      show: true,
      default: false,
    },
    pos: {
      show: true,
      default: 3,
    },
    ap: {
      show: true,
      default: 2,
    },
    pda: {
      show: true,
      default: 2,
    },
    printer: {
      show: true,
      default: 1,
    },
    cctv: {
      show: true,
      default: 1,
    },
    ups: {
      show: true,
      default: 1,
    },
    edc: {
      show: true,
      default: 1,
    },
  };
  constructor(
    private _ipService: IpService,
    private _fb: FormBuilder,
    private _router: Router,
    private _messageService: MessageService,
    private _settingService: SettingService
  ) {
    this.store = this._fb.group({
      id: ['', Validators.required],
      gw: false,
      sc: false,
      got: false,
      pos: '',
      ap: '',
      pda: '',
      printer: '',
      ups: '',
      cctv: '',
      edc: '',
    });
    this._settingService.getSetting().subscribe((x) => {
      this.setting = x;
      this.setFormControl();
    });
  }

  setFormControl() {
    Object.keys(this.setting).forEach((k) => {
      if (this.uniqueDevices.includes(k as DeviceType)) {
        this.store.controls[k].setValue(
          this.setting[k].show ? this.setting[k].default : false
        );
      } else {
        this.store.controls[k].setValue(
          this.setting[k].show
            ? this.convertOutput(this.setting[k].default)
            : ''
        );
      }
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

  convertOutput(n: number): string {
    if (n === 0) {
      return '';
    } else if (n === 1) {
      return '1';
    } else {
      return `1-${n}`;
    }
  }
}
