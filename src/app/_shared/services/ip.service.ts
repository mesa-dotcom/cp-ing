import { Injectable } from '@angular/core';
import { DevicePriority, ErrorMsg, LimitedNumberDevice, UniqueDevices } from '../constants';
import { DeviceType } from '../enums';
import { Device } from '../models';
import { InputHandlerService } from './input-handler.service';

@Injectable({
  providedIn: 'root',
})
export class IpService {
  constructor(private _inputHandlerService: InputHandlerService) {}

  public createDevicesOfStores<T>(
    storeIds: string,
    devicesOfStore: { [key: string]: any }
  ) {
    delete devicesOfStore['id'];
    const stores = [
      ...new Set(this._inputHandlerService.createArrayOfStore(storeIds)),
    ];
    const devicesOfStores: { storeId: string; devices: Device[] }[] = [];
    stores.forEach((store) => {
      devicesOfStores.push({
        storeId: store,
        devices: this.createDevices(store, devicesOfStore),
      });
    });
    return devicesOfStores.sort(this.compareStoreById);
  }

  private createDevices(
    storeId: string,
    devicesOfStore: { [key: string]: any }
  ): Device[] {
    const domain = this.generateDomain(storeId);
    const devices: Device[] = [];
    Object.keys(devicesOfStore).forEach((key) => {
      if (UniqueDevices.includes(key as DeviceType)) {
        devicesOfStore[key]
          ? devices.push(this.generateIP(domain, key as DeviceType, null))
          : void 0;
      } else if (devicesOfStore[key] !== '' && devicesOfStore[key] !== null) {
        const numbers = this._inputHandlerService.createArrayOfDevices(
          devicesOfStore[key],
          key as DeviceType
        );
        if (numbers.some(n => n > LimitedNumberDevice[key as DeviceType])) {
          throw new Error(
            ErrorMsg.limitedNumber(key as DeviceType)
          );
        }
        numbers.forEach((n) => {
          devices.push(this.generateIP(domain, key as DeviceType, n));
        });
      }
    });
    return devices.sort(this.compareDeviceByType);
  }
  private generateIP(
    domain: string,
    type: DeviceType,
    no?: number | null
  ): Device {
    const device: Device = {
      type: type,
      no: no,
      ip: '',
      status: ['pending', 'pending', 'pending', 'pending'],
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
  private generateDomain(storeId: string): string {
    const fullStoreId = storeId.length === 4 ? '7' + storeId : storeId;
    return `11${fullStoreId[0]}.1${fullStoreId.substring(
      1,
      3
    )}.1${fullStoreId.substring(3, 5)}`;
  }

  private compareDeviceByType(a: Device, b: Device) {
    if (DevicePriority[a.type] < DevicePriority[b.type]) {
      return -1;
    }
    if (DevicePriority[a.type] > DevicePriority[b.type]) {
      return 1;
    }
    return 0;
  }

  private compareStoreById(a: any, b: any) {
    return Number(a.storeId) - Number(b.storeId);
  }
}
