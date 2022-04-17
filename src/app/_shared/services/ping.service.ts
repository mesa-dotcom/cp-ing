import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, from, interval, map, Observable, pipe, repeat } from 'rxjs';
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
    this._http
      .post('/api/ping', { ip: device.ip })
      .pipe(repeat(4))
      .subscribe((res: any) => {
        device.status.unshift(res.alive ? 'success' : 'failed');
        device.status.pop();
      });
  }

  public pingRepeat(ip: string, times: number = 4): Observable<any> {
    return this._http.post('api/ping', { ip }).pipe(
      map((x: any) => ({ all: x, display: this.formatOutput(x.output) })),
      repeat(times)
    );
  }

  public pingContinuously(ip: string): Observable<any> {
    return interval(1000).pipe(
      concatMap(() =>
        this._http
          .post('api/ping', { ip })
          .pipe(
            map((x: any) => ({ all: x, display: this.formatOutput(x.output) }))
          )
      )
    );
  }
}
