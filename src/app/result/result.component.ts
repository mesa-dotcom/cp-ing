import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'comp-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  public storeId = '30001';
  public results: any[] = [
    {
      device: 'SC',
      no: '-',
      ip: '113.100.101.119',
    },
  ];
  public objectImage = new Image()
  constructor(private _http: HttpClient) {}

  ngOnInit(): void {

  }
}
