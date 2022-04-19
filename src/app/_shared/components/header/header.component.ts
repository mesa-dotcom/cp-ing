import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'comp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DialogService, MessageService],
})
export class HeaderComponent implements OnInit {
  webTitle: string = 'CP-ing';
  constructor(
    public dialogService: DialogService,
    public messageService: MessageService
  ) {}
  displayModal: boolean = false;

  ngOnInit(): void {}

  openSetting() {
    this.displayModal = true;
  }

  settingChanged(e: any) {
    console.log(e);
  }
}
