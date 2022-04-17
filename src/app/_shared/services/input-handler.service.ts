import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputHandlerService {
  constructor() {}
  public createArrayOfStore(value: string): string[] {
    const stores = value.split(',');
    if (
      !this.correctStoreAlphaNumeric(value) ||
      stores.some((s) => s.length !== 4 && s.length !== 5)
    )
      throw new Error(`${value} is an incorrect Store input.`);
    return stores;
  }

  public createArrayOfDevices(value: string): number[] {
    if (!this.correctDeviceAlphaNumeric(value))
      throw new Error(`${value} is an incorrect Device input.`);
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
      throw new Error(`${nums} is an incorrect store Input`);

    for (let i = +nums[0]; i <= +nums[1]; i++) {
      sequences.push(i);
    }
    return sequences;
  }
}
