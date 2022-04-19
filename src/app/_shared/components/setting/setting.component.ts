import { Component, OnInit } from '@angular/core';
import { DeviceABBR, DeviceFullName, LimitedNumberDevice, UniqueDevices } from '../../constants';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'comp-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  setting: any = {}
  keys: string[] = []
  deviceFullName = DeviceFullName
  deviceAbbr = DeviceABBR
  uniqueDevice = UniqueDevices
  limitedNumberDevice = LimitedNumberDevice
  constructor(private _settingService: SettingService) {
    this.setting = this._settingService.getSetting()
    this.keys = Object.keys(this.setting)
    console.log(this.setting[this.keys[0]].show);
  }

  ngOnInit(): void {

  }
}
