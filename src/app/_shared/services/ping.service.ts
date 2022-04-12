import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, interval, map, mergeMap, Observable, repeat, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PingService {
  constructor(private _http: HttpClient) {}

  formatOutput(output: string): string {
    return output.split('Ping statistics')[0];
  }

  ping(ip: string, times: number = 4): Observable<any> {
    return this._http.post('api/ping', { ip }).pipe(
      map((x: any) => {
        return { all: x, display: this.formatOutput(x.output) };
      }),
      repeat(times)
    );
  }

  pingContinuously(ip: string): Observable<any> {
    return interval(1000).pipe(concatMap(() => this.ping(ip, 1)));
  }
}
