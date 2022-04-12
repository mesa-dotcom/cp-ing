import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  concatMap,
  interval,
  map,
  Observable,
  repeat,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PingService {
  constructor(private _http: HttpClient) {}

  private formatOutput(output: string): string {
    return output.split('Ping statistics')[0];
  }

  public ping(ip: string) {
    return this._http
      .post('api/ping', { ip })
      .pipe(
        map((x: any) => ({ all: x, display: this.formatOutput(x.output) }))
      );
  }

  public pingRepeat(ip: string, times: number = 4): Observable<any> {
    return this.ping(ip).pipe(repeat(times));
  }

  public pingContinuously(ip: string): Observable<any> {
    return interval(1000).pipe(concatMap(() => this.ping(ip)));
  }
}
