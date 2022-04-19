import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private setting: Observable<{
    [key: string]: Partial<{ show: boolean; default: any }>;
  }> = of({
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
  });
  constructor(private _http: HttpClient) {}

  getSetting() {
    return this._http.get('/api/setting');
  }
}
