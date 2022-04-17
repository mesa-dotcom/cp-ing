import { DeviceType } from '../enums';
import { DeviceABBR } from './device-abbr';
import { LimitedNumberDevice } from './limited-number-device';

export class ErrorMsg {
  static required(field: string) {
    return `${field} is required.`;
  }

  static atLeastOne() {
    return `You must add at least one device.`;
  }

  static limitedNumber(device: DeviceType) {
    return `Maximum number of ${DeviceABBR[device]} is ${LimitedNumberDevice[device]}.`;
  }

  static incorrectStoreInput(value: string) {
    return `${value} is an incorrect store input.`;
  }

  static incorrectStoreId() {
    return `Store ID must be 4 or 5 characters long.`;
  }

  static incorrectDeviceInput(value: string, device: DeviceType) {
    return `${value} is an incorrect input for ${DeviceABBR[device]}.`;
  }
}
