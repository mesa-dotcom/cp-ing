import { Component, OnInit } from '@angular/core';
import { IpService } from '../_shared/services/ip.service';

@Component({
  selector: 'comp-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  public store: string = ''
  constructor(private _ipService: IpService) { }

  ngOnInit(): void {
  }

  ping() {
    if (this.store.length > 3) {
      const full_store_id = this.store.length === 4 ? '0' + this.store : this.store
      this._ipService.generateIPs(full_store_id)
    }
  }

}
