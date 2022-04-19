import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import {
  DeviceABBR,
  DeviceFullName,
  LimitedNumberDevice,
  UniqueDevices,
} from '../../constants';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'comp-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
})
export class SettingComponent implements OnInit, OnChanges {
  @Input() isOpen: boolean = false;
  setting: any = {};
  keys: string[] = [];
  deviceFullName = DeviceFullName;
  deviceAbbr = DeviceABBR;
  uniqueDevice = UniqueDevices;
  limitedNumberDevice = LimitedNumberDevice;
  constructor(private _settingService: SettingService) {

  }

  ngOnChanges(): void {
    this._settingService.getSetting().subscribe(x => {
      this.setting = x;
      this.keys = Object.keys(x)
    })
  }

  ngOnInit(): void {}
}
