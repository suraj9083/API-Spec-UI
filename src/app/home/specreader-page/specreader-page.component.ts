import { Component, Inject, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-specreader-page',
  templateUrl: './specreader-page.component.html',
  styleUrls: ['./specreader-page.component.scss']
})
export class SpecreaderPageComponent implements OnInit {
  selectedFile!: File | null;
  routes: boolean = false;
  fullRoutes: boolean = false;
  submitBtn: boolean = false;
  paths: any[] = [];
  allRoutes: any = [];
  server: any = [];
  pathsCount: any;
  routesCount: any;
  limit = 6;
  numItemsToShow: number = 6;
  btnFlag: boolean = true

  constructor(private service: ServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = null;
    this.routes = false;
    this.submitBtn = true;
    this.selectedFile = event.target.files[0];
    if (this.selectedFile === undefined) {
      this.submitBtn = false;
    }
    console.log("selectedFile ==> ", this.selectedFile)
  }

  onSubmit() {
    this.service.specReader(this.selectedFile).then((resp: any) => {
      this.fullRoutes = false;
      this.btnFlag = true;
      if (resp.error == "false") {
        this.routes = true;
        this.paths = resp.paths;
        this.pathsCount = resp.paths.length;
        this.allRoutes = resp.routes;
        this.server = resp.serverUrl;
        console.log({
          "server": this.server,
          "paths": this.paths,
          "routes": this.allRoutes
        })
        console.log(resp)
      }
      else {
        this.dialog.open(PopupComponent, {
          data: resp.error
        });
        this.routes = false;
        this.submitBtn = false;
        this.paths = [];
        this.allRoutes = [];
        this.server = [];
        this.limit = 6;
        this.numItemsToShow = 6;
        let fileName = document.getElementById('file-name') as HTMLElement | any;
        fileName.value = '';
      }
    })
  }

  doTrue() {
    this.fullRoutes = true;
    this.btnFlag = false;
  }

  showMoreLimit() {
    this.dialog.open(PopupComponent, {
      data: {
        'paths': this.paths,
        'true': 'paths'
      }
    });
  }

  showMore() {
    this.dialog.open(PopupComponent, {
      data: {
        'paths': this.allRoutes,
        'true': 'fullRoutes'
      }
    });
  }

  fileInput() {
    let fileInput = document.getElementById('file-input') as HTMLElement | any;
    let fileName = document.getElementById('file-name') as HTMLElement | any;

    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file) {
        fileName.value = file.name;
      } else {
        fileName.value = '';
      }
    });
  }

}
