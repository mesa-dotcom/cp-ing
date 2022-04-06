import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputHandlerService {
  constructor() {}
  public createArrayFromInput(value: string): number[] {
    if (this.correctAlphaNumeric(value)) {
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
    throw new Error(`${value} Incorrect Input`);
  }
  private correctAlphaNumeric(value: string): boolean {
    const newValue = value.replace(/,/g, '').replace(/-/g, '');
    return !!Number(newValue) && !newValue.includes('0');
  }
  private arrayFromDash(value: string): number[] {
    const nums = value.split('-');
    const sequences: number[] = [];
    if (nums.length === 2 && Number(nums[0]) < Number(nums[1])) {
      for (let i = +nums[0]; i <= +nums[1]; i++) {
        sequences.push(i);
      }
      return sequences;
    }
    throw new Error('Incorrect Input');
  }
}
