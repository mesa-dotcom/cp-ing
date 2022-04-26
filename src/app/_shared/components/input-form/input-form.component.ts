import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DeviceABBR, LimitedNumberDevice, UniqueDevices } from '../../constants';
import { DeviceType } from '../../enums';

@Component({
  selector: 'comp-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent implements OnInit, OnChanges {
  public styleClass: { [key: string]: string } = {
    wrapper: 'xl:col-3 lg:col-4 md:col-6 grid align-items-center',
    label: 'xl:col-3 lg:col-4 md:col-6 align-self-center',
  };
  deviceAbbr = DeviceABBR;
  uniqueDevices = UniqueDevices as string[]
  @Input() formGroup: FormGroup = new FormGroup({});
  @Input() deviceName: DeviceType | string = DeviceType.POS;
  options: { name: string; value: number }[] = [];
  constructor() {}

  ngOnChanges(): void {
  }

  ngOnInit(): void {
    console.log(this.formGroup.controls[this.deviceName].value);
    for (let index = 0; index < LimitedNumberDevice[this.deviceName]; index++) {
      this.options.push({
        name: `${this.deviceAbbr[this.deviceName]} ${index + 1}`,
        value: index + 1,
      });
    }
  }
}
