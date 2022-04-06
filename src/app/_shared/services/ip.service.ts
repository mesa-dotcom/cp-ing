import { Injectable } from '@angular/core';
import { DeviceType } from '../enums';
import { Device } from '../models';

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor() { }

  public generateIPs(store_id: string, pickedDevices: Device[] = []): any {
    const domain = this.generateDomain(store_id)
    pickedDevices.forEach((d) => {
      switch (d.type) {
        case DeviceType.GW:
          d.ip = `${domain}.110`
          break;
        case DeviceType.SC:
          d.ip = `${domain}.119`
          break;
        case DeviceType.POS:
          d.ip = `${domain}.11${d.No}`
          break;
        case DeviceType.AP:
          d.ip = `${domain}.10${d.No}`
          break;
        case DeviceType.PDA:
          d.ip = `${domain}.13${d.No}`
          break;
        case DeviceType.UPS:
          d.ip = `${domain}.${96 + Number(d.No)}`
          break;
        case DeviceType.CCTV:
          d.ip = `${domain}.${8 + Number(d.No)}`
          break;
        case DeviceType.EDC:
          d.ip = `${domain}.${208 + Number(d.No)}`
          break;
        case DeviceType.GOT:
          d.ip = `${domain}.146`
          break;
        case DeviceType.PRINTER:
          d.ip = `${domain}.12${d.No}`
          break;
        default:
          d.ip = `${domain}.110`
          break;
      }
    })
    return pickedDevices
  }

  private generateDomain(storeId: string) {
    return `11${storeId[0]}.1${storeId.substring(1, 3)}.1${storeId.substring(3, 5)}`
  }
}
