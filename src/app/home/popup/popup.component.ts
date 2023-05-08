import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';
import { saveAs } from 'file-saver';
import * as yaml from 'js-yaml'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  initModal: boolean = true;
  paths: boolean = false;
  forRoute: boolean = false;
  filename: boolean = false;
  filenameFromParent: any;
  fileType: any;
  fileInputValue: string = '';
  name: any;
  download: boolean = false;
  downFileType: String = '';
  downFileResp: any;
  delete: boolean = false;
  route: string = '';

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceService
  ) { }

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
    else if (this.data.true == 'filename') {
      console.log("filename", this.data)
      this.initModal = false;
      this.filename = true;
      this.filenameFromParent = this.data.filename;
      this.fileType = this.data.fileType;
    }
    else if (this.data.true == 'download') {
      console.log("filename", this.data)
      this.initModal = false;
      this.download = true;
      this.downFileType = this.data.filetype
      this.downFileResp = this.data.responseFromAPI;
    }
    else if (this.data.true == 'delete') {
      console.log("fullRoute", this.data)
      this.route = this.data.item;
      this.initModal = false;
      this.delete = true;
    }

  }

  // takeNanem(name: any) {
  //   if (name.length > 32) {
  //     this.name = name.substr(0, 32);
  //     console.log(this.name);
  //   }
  // }

  validateFilename(name: any) {
    this.name = name.slice(32, name.lenght);
    let body;
    if (this.fileType == "application/json" || this.fileType == "application/json") {
      body = {
        "filename": this.name,
        "type": "JSON"
      }
      this.filename = name;
    }
    else {
      body = {
        "filename": this.name,
        "type": "YAML"
      }
      this.filename = name;
    }
    this.service.validateFilename(body).then((resp: any) => {
      console.log("Resp>>>", resp);
      if (resp.msg == 'file valid!!') {
        this.dialogRef.close();
      }
      else if (resp.msg == 'File Invalid') {
        alert(resp.msg)
      }
      else {
        alert(resp.msg)
      }
    })
  }

  onInput(event: any) {
    this.fileInputValue = event.clipboardData.getData('text/plain');
    console.log(this.fileInputValue)
  }

  downloadFile() {
    if (this.downFileType == "json") {
      const jsonContent = JSON.stringify(this.data.responseFromAPI);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      saveAs(blob, 'api-spec.json');
      this.dialogRef.close();
    }
    else {
      const yamlContent = yaml.dump(this.data.responseFromAPI);
      const blob = new Blob([yamlContent], { type: 'application/x-yaml' });
      saveAs(blob, 'api-spec.yaml');
      this.dialogRef.close();
    }
  }

  deleteItem() {
    this.dialogRef.close()
  }

}
