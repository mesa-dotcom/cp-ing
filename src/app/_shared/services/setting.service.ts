import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private setting: {[key: string] : Partial<{ show: boolean, default: any}>} = {
    gw: {
      show: true,
    },
    sc: {
      show: true,
    },
    got: {
      show: true,
    },
    pos: {
      show: true,
      default: 3
    },
    ap: {
      show: true,
      default: 2
    },
    pda: {
      show: true,
      default: 2
    }
  }
  constructor() { }

  getSetting() {
    return this.setting
  }
}
