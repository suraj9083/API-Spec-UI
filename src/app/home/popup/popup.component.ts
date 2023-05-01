import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  initModal: boolean = true;
  paths: boolean = false;
  forRoute: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log("data popup", this.data)
    if (this.data.true == 'paths') {
      this.initModal = false;
      this.paths = true;
    }
    else if (this.data.true == 'fullRoutes') {
      console.log("fullRoute", this.data)
      this.initModal = false;
      this.forRoute = true;
    }
  }


}
