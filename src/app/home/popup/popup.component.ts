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
  filename1: boolean = true;
  filenameFromParent: any;
  fileType: any;
  fileInputValue: string = '';
  name: any;
  download: boolean = false;
  downFileType: String = '';
  downFileResp: any;
  delete: boolean = false;
  route: string = '';
  msg: boolean = false;
  selectedFile!: File | null;
  public loading = false;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServiceService
  ) { }

  ngOnInit(): void {
    if (this.data.true == 'paths') {
      console.log("data popup", this.data)
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
      console.log("delete", this.data)
      this.route = this.data.item;
      this.initModal = false;
      this.delete = true;
    }
  }

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
        this.filename1 = false;
        this.msg = true;
      }
      else if (resp.msg == 'File Invalid') {
        alert(resp.msg);
        window.location.reload();
      }
      else {
        alert(resp.msg);
        window.location.reload();
      }
    })
  }

  onInput(event: any) {
    this.fileInputValue = event.clipboardData.getData('text/plain');
    console.log(this.fileInputValue)
  }

  downloadFile() {
    if (this.downFileType == "json" || this.downFileType == "application/json") {
      const jsonContent = JSON.stringify(this.data.responseFromAPI);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      saveAs(blob, 'api-spec.json');
      window.location.reload();
      this.dialogRef.close();
    }
    else {
      const yamlContent = yaml.dump(this.data.responseFromAPI);
      const blob = new Blob([yamlContent], { type: 'application/x-yaml' });
      saveAs(blob, 'api-spec.yaml');
      window.location.reload();
      this.dialogRef.close();
    }
  }

  deleteItem() {
    this.dialogRef.close()
  }

  withForm() {
    this.dialogRef.close();
  }

  onFileSelected(event: any) {
    this.loading = true;
    this.selectedFile = null;
    this.selectedFile = event.target.files[0];
    if (this.selectedFile === undefined) {
      console.log("selectedFile ==> ", this.selectedFile)

    }
    else {
      console.log("selectedFile ==> ", this.selectedFile)
      console.log("filename", this.filenameFromParent, this.fileType)
      let body = {
        filename: this.filenameFromParent,
        fileType: this.fileType
      }
      this.service.uploadXlsx(this.selectedFile, body).then((resp) => {
        if (resp.openapi != '') {
          console.log(resp, "<<<<")
          if (resp.status == "failed") {
            this.data = resp.msg;
            this.loading = false;
            this.filename = false;
            this.initModal = true;
          }
          else {
            this.data.responseFromAPI = resp;
            this.filename = false;
            this.loading = false;
            this.download = true;
          }
        }
        else {
          alert("File invalid please check it!!")
        }
      })

    }
  }

  reload() {
    window.location.reload();
  }


}
