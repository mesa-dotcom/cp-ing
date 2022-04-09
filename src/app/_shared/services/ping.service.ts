import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PingService {

  constructor(private _http: HttpClient) { }

  ping(ip: string, times: number = 4): Observable<any> {
    return this._http.post('api/ping', { ip });
  }
}
