import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, interval, map, Observable, repeat } from 'rxjs';
import { Device } from '../models';
@Injectable({
  providedIn: 'root',
})
export class PingService {
  constructor(private _http: HttpClient) {}

  private formatOutput(output: string): string {
    return output.split('Ping statistics')[0];
  }

  public pingDevice(device: Device) {
    return this._http.post('http://localhost:3000/ping', { ip: device.ip }).pipe(repeat(4));
  }

  public pingRepeat(ip: string, times: number = 4): Observable<any> {
    return this._http.post('http://localhost:3000/ping', { ip }).pipe(
      map((x: any) => ({ all: x, display: this.formatOutput(x.output) })),
      repeat(times)
    );
  }

  public pingContinuously(ip: string): Observable<any> {
    return interval(1000).pipe(
      concatMap(() =>
        this._http
          .post('http://localhost:3000/ping', { ip })
          .pipe(
            map((x: any) => ({ all: x, display: this.formatOutput(x.output) }))
          )
      )
    );
  }
}
