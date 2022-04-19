import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SettingService } from '../../services/setting.service';

@Component({
  selector: 'comp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DialogService, MessageService],
})
export class HeaderComponent implements OnInit {
  webTitle: string = 'CP-ing';
  private _setting_data = {};
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService,
    private _settingService: SettingService,
    private _router: Router
  ) {}
  displayModal: boolean = false;

  ngOnInit(): void {}

  openSetting() {
    this.displayModal = true;
  }

  settingChanged(e: any) {
    this._setting_data = e;
  }

  saveSetting() {
    if (Object.keys(this._setting_data).length !== 0) {
      try {
        this._settingService
          .saveSetting(this._setting_data)
          .subscribe((res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Setting saved',
            });
            this.displayModal = false;
            if (this._router.url === '/') {
              this._router.navigateByUrl('/result')
            } else {
              this._router.navigateByUrl('/')
            }

          });
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Setting not saved',
        });
      }
    } else {
      this.displayModal = false;
    }
  }
}
