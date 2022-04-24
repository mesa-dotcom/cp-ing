import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeviceABBR, LimitedNumberDevice } from '../../constants';
import { DeviceType } from '../../enums';

@Component({
  selector: 'comp-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent implements OnInit, OnChanges {
  deviceAbbr = DeviceABBR;
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() deviceName: DeviceType | string = DeviceType.POS;
  tvalue = [1,2];
  options: { name: string; value: number }[] = [];
  constructor() {}

  ngOnChanges(): void {
    this.tvalue = this.formGroup.controls[this.deviceName].value;
  }

  ngOnInit(): void {
    this.tvalue = this.formGroup.controls[this.deviceName].value;
    console.log(this.formGroup.controls[this.deviceName].value);
    for (let index = 0; index < LimitedNumberDevice[this.deviceName]; index++) {
      this.options.push({
        name: `${this.deviceAbbr[this.deviceName]} ${index + 1}`,
        value: index + 1,
      });
    }
  }
}
