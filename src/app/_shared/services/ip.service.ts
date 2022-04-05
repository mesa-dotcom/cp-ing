import { Injectable } from '@angular/core';
import { DeviceType } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor() { }

  public generateIPs(store_id: string): any {
    const domain = this.createDomain(store_id)
    return domain
  }

  private createDomain(store_id: string) {
    return `11${store_id[0] === '0' ? '7' : store_id[0]}.1${store_id.substring(1, 3)}.1${store_id.substring(3, 5)}`
  }
}
