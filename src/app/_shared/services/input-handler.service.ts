import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputHandlerService {
  constructor() {}

  public getArrayOfInput(value: string): number[] {
    let output: number[] = [];
    value.split(',').forEach((v) => {
      output = output.concat(this.sequenceInput(v));
    });
    return [...new Set(output)].sort();
  }

  public sequenceInput(value: string): number[] {
    const beginEnd = value.split('-');
    const begin = beginEnd[0];
    const end = beginEnd[1];
    if (beginEnd.length === 2 && begin <= end) {
      const result = [];
      for (let i = +begin; i <= +end; i++) {
        result.push(i);
      }
      return result;
    } else if (beginEnd.length === 1) {
      return [+begin];
    }
    throw new Error('Input is incorrect');
  }

  public checkInputValidate(value: string): boolean {
    const newValue = value.replace(',', '').replace('-', '');
    return !!Number(newValue);
  }
}
