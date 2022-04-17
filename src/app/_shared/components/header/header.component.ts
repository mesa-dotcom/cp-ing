import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'comp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  webTitle: string = 'CP-ing'
  constructor() { }

  ngOnInit(): void {
  }

}
