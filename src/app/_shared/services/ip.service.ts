import { Injectable } from '@angular/core';
import { DevicePriority } from '../constants';
import { DeviceType } from '../enums';
import { Device } from '../models';
import { InputHandlerService } from './input-handler.service';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  private readonly UniqueDevices: DeviceType[] = [
    DeviceType.SC,
    DeviceType.GOT,
    DeviceType.GW,
  ];
  constructor(private _inputHandlerService: InputHandlerService) {}

  public createDevices(
    storeId: string,
    store: { [key: string]: any }
  ): Device[] {
    const devices: Device[] = [];
    delete store['id'];
    Object.keys(store).forEach((key) => {
      if (this.UniqueDevices.includes(key as DeviceType)) {
        store[key]
          ? devices.push(this.generateIP(storeId, key as DeviceType, null))
          : void 0;
      } else if (store[key] !== '' && store[key] !== null) {
        const numbers = this._inputHandlerService.createArrayFromInput(
          store[key]
        );
        numbers.forEach((n) => {
          devices.push(this.generateIP(storeId, key as DeviceType, n));
        });
      }
    });
    return devices.sort(this.compareByType);
  }
  private generateIP(storeId: string, type: DeviceType, no?: number | null): Device {
    const domain = this.generateDomain(storeId);
    const device: Device = {
      type: type,
      no: no,
      ip: '',
    };
    switch (type) {
      case DeviceType.GW:
        device.ip = `${domain}.110`;
        break;
      case DeviceType.SC:
        device.ip = `${domain}.119`;
        break;
      case DeviceType.POS:
        device.ip = `${domain}.11${no}`;
        break;
      case DeviceType.AP:
        device.ip = `${domain}.10${no}`;
        break;
      case DeviceType.PDA:
        device.ip = `${domain}.13${no}`;
        break;
      case DeviceType.UPS:
        device.ip = `${domain}.${96 + Number(no)}`;
        break;
      case DeviceType.CCTV:
        device.ip = `${domain}.${8 + Number(no)}`;
        break;
      case DeviceType.EDC:
        device.ip = `${domain}.${208 + Number(no)}`;
        break;
      case DeviceType.GOT:
        device.ip = `${domain}.146`;
        break;
      case DeviceType.PRINTER:
        device.ip = `${domain}.12${no}`;
        break;
      default:
        device.ip = `${domain}.110`;
        break;
    }
    return device;
  }
  private generateDomain(storeId: string) {
    const fullStoreId = storeId.length === 4 ? '7' + storeId : storeId;
    return `11${fullStoreId[0]}.1${fullStoreId.substring(
      1,
      3
    )}.1${fullStoreId.substring(3, 5)}`;
  }

  public compareByType(a: Device, b: Device) {
    if (DevicePriority[a.type] < DevicePriority[b.type]) {
      return -1;
    }
    if (DevicePriority[a.type] > DevicePriority[b.type]) {
      return 1;
    }
    return 0;
  }
}
