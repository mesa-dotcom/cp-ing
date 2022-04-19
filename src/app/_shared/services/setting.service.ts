import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, share } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private setting!: Observable<any>;
  constructor(private _http: HttpClient) {
    this.setting = this._http.get('/api/setting').pipe(share())
  }

  getSetting() {
    return this.setting;
  }

  saveSetting(setting: any) {
    return this._http.post('/api/setting', { setting });
  }
}
