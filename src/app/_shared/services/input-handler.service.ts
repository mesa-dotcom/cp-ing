import { Injectable } from '@angular/core';
import { ErrorMsg } from '../constants';
import { DeviceType } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class InputHandlerService {
  constructor() {}
  public createArrayOfStore(value: string): string[] {
    const stores = value.split(',');
    if (
      !this.correctStoreAlphaNumeric(value)
    ){
      throw new Error(ErrorMsg.incorrectStoreInput(value));
    } else if (stores.some((s) => s.length !== 4 && s.length !== 5)) {
      throw new Error(ErrorMsg.incorrectStoreId());
    }
    return stores;
  }

  public createArrayOfDevices(value: string, deviceType: DeviceType): number[] {
    if (!this.correctDeviceAlphaNumeric(value))
      throw new Error(ErrorMsg.incorrectDeviceInput(value, deviceType));
    let output: number[] = [];
    value.split(',').forEach((v) => {
      if (v.includes('-')) {
        output = output.concat(this.arrayFromDash(v));
      } else {
        output.push(Number(v));
      }
    });
    return [...new Set(output)];
  }

  private correctStoreAlphaNumeric(value: string): boolean {
    const newValue = value.replace(/,/g, '');
    return !!Number(newValue);
  }

  private correctDeviceAlphaNumeric(value: string): boolean {
    const newValue = value.replace(/,/g, '').replace(/-/g, '');
    return (!!Number(newValue) && !newValue.includes('0')) || value === '';
  }

  private arrayFromDash(value: string): number[] {
    const nums = value.split('-').filter((v) => v !== '');
    const sequences: number[] = [];
    if (nums.length !== 2 || Number(nums[0]) > Number(nums[1]))
      throw new Error(`${value} is an incorrect input.`);

    for (let i = +nums[0]; i <= +nums[1]; i++) {
      sequences.push(i);
    }
    return sequences;
  }
}
