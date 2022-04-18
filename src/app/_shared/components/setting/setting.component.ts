import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'comp-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  setting: any = {}
  constructor(private _settingService: SettingService) {
    this.setting = this._settingService.getSetting()
  }

  ngOnInit(): void {

  }

}
