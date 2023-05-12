import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';
import { PopupComponent } from '../popup/popup.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import * as yaml from 'js-yaml'
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-on-apispec',
  templateUrl: './edit-on-apispec.component.html',
  styleUrls: ['./edit-on-apispec.component.scss']
})
export class EditOnApispecComponent implements OnInit {
  // public myFormForPath!: FormGroup<PathForm>;
  selectedFile!: File | null;
  selectfile: boolean = true;
  submitBtn: boolean = false;
  submitBtn1: boolean = false;
  fileName: any;
  showFileName: boolean = false;
  fileType: string = '';
  method: string = '';
  inputs: any[] = [];
  inputs1: any[] = [];
  formData: any = {};
  dataFromUser: any[] = [];
  typeOptions = [
    { value: 'string' },
    { value: 'number' },
  ];
  fileValid: boolean = false;
  filename: string = '';
  addgetPathCount: number = 0;
  addpostPathCount: number = 0;
  addPath: boolean = false;
  isPost: boolean = true;
  isGet: boolean = false;
  moreBtn: boolean = true;
  saveBtn: boolean = false;

  constructor(private service: ServiceService, private dialog: MatDialog, private fb: FormBuilder, private location: Location) { }

  ngOnInit(): void {
  }

  onFileSelected(event: any) {
    this.selectedFile = null;
    this.submitBtn = true;
    this.selectedFile = event.target.files[0];
    if (this.selectedFile === undefined) {
      this.selectfile = true;
      this.submitBtn = false;
      this.submitBtn1 = false;
      this.showFileName = false;
      this.fileValid = false;
    }
    else {
      this.showFileName = false;
      this.submitBtn1 = false;
      this.fileValid = false;
      this.fileType = event.target.files[0].type
    }
    console.log("selectedFile ==> ", this.selectedFile)
  }

  addInput() {
    this.inputs.push({ name: '', type: '' });
  }

  removeInput(input: any) {
    const index = this.inputs.indexOf(input);
    if (index >= 0) {
      this.inputs.splice(index, 1);
    }
  }

  addInput1() {
    this.inputs1.push({ name1: '', type1: '' });
  }

  removeInput1(input: any) {
    const index = this.inputs1.indexOf(input);
    if (index >= 0) {
      this.inputs1.splice(index, 1);
    }
  }

  takeMethod(event: any) {
    if (event.target.value == 'post') {
      this.isPost = true;
      this.isGet = false;
    }
    else {
      this.isPost = false;
      this.isGet = true;
    }

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

  onSubmit() {
    this.service.getFileName(this.selectedFile).then((resp: any) => {
      if (resp.error == "false") {
        console.log(resp)
        this.selectfile = false;
        this.filename = resp.filename;
        this.showFileName = true;
        this.submitBtn = false;
        this.submitBtn1 = true;
        this.fileValid = false;
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
          "true": 'filename',
          "filename": resp.filename,
          "fileType": this.fileType
        }
        let dialogRef = this.dialog.open(PopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((result: string) => {
          console.log('The dialog was closed', result, typeof result);
          this.showFileName = false;
          this.fileValid = true;
          if (result == '') {
            console.log("Inside if")
            this.showFileName = true;
            this.fileValid = false;
            this.selectfile = true;
          }
          else if (result.length < 32 || result.length > 32) {
            console.log("Inside else if")
            this.showFileName = true;
            this.fileValid = false;
            this.selectfile = true;
          }
          else if (result === undefined) {
            console.log("Inside else if undefind")
          }
          else {
            this.showFileName = false;
            this.fileValid = true;
          }
        });
      }
      else {
        this.dialog.open(PopupComponent, {
          data: resp.error
        });
        this.submitBtn = false;
        let fileName = document.getElementById('file-name') as HTMLElement | any;
        fileName.value = '';
      }
    })
  }

  toggleDetails(event: any) {
    if (event && event.target) {
      const box = event.target;
      box.classList.toggle('small-box');
      box.classList.toggle('large-box');
    }
  }

  replaceData(itemm: any) {
    let knowIndex: any;
    if (this.dataFromUser.length > 0) {
      console.log("Inside if")
      for (let i = 0; i < this.dataFromUser.length; i++) {
        console.log("Inside for")
        if (this.dataFromUser[i].tag == itemm) {
          knowIndex = this.dataFromUser.indexOf(this.dataFromUser[i])
          this.inputs = this.dataFromUser[i].reqInput
          this.inputs1 = this.dataFromUser[i].resInput
        }
      }
    }
    this.formData = this.dataFromUser[knowIndex];
    this.saveBtn = true;
    this.moreBtn = false;
  }

  deleteRoute(item: any) {
    console.log("Delete B>>>", this.dataFromUser)
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.width = "460px";
    dialogConfig.data = {
      "true": "delete",
      "item": item
    }
    let dialogRef = this.dialog.open(PopupComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      console.log("Item Deleted Successfully!!", result);
      if (result === true) {
        // skip cancel btn clicked
        console.log("Cancel btn clicked on Delete modal")
      }
      else {
        let takeIndex: any;
        for (let i = 0; i < this.dataFromUser.length; i++) {
          if (this.dataFromUser[i].keyPath == item) {
            takeIndex = this.dataFromUser.indexOf(this.dataFromUser[i]);
          }
        }
        this.dataFromUser.splice(takeIndex, 1);
        console.log("Delete A>>>>", this.dataFromUser);
      }
    })
  }

  save() {
    console.log("onSave", this.formData)
    if (this.dataFromUser.length > 0) {
      for (let i = 0; i < this.dataFromUser.length; i++) {
        if (this.dataFromUser[i].tag == this.formData.tag) {
          this.dataFromUser[i] = this.formData
        }
      }
    }
    this.formData = {};
    this.inputs = [];
    this.inputs1 = [];
    this.saveBtn = false;
    this.moreBtn = true;
  }

  addMorePath() {
    this.formData['reqInput'] = this.inputs;
    this.formData['resInput'] = this.inputs1
    this.dataFromUser.push(this.formData)
    if (this.formData.method == 'get') {
      this.addgetPathCount = this.addgetPathCount + 1;
      this.addPath = true;
    }
    else if (this.formData.method == 'post') {
      this.addpostPathCount = this.addpostPathCount + 1;
      this.addPath = true;
    }
    else {
      alert("Please select API method");
      this.formData = {};
      this.inputs = [];
      this.inputs1 = [];
    }
    this.formData = {};
    this.inputs = [];
    this.inputs1 = [];
    if (this.dataFromUser.length > 0) {
      console.log(this.dataFromUser.length, "<<<<<< length")
      console.log(this.dataFromUser, "<<<<<< data");
    }
    else {
      this.addPath = false;
    }
  }

  Submit() {
    console.log("Submit >>>", this.dataFromUser);
    if (this.dataFromUser.length > 0) {
      for (let z = 0; z < this.dataFromUser.length; z++) {
        if (this.dataFromUser[z].reqInput == '[]') {
          let indexx = this.dataFromUser.indexOf(this.dataFromUser[z]);
          this.dataFromUser.splice(indexx, 1);
        }
      }
    }
    if (this.formData.keyPath == '' || this.formData.method == '') {
      // skipp
    }
    else {
      this.formData['reqInput'] = this.inputs;
      this.formData['resInput'] = this.inputs1
      this.dataFromUser.push(this.formData)
    }
    console.log(this.dataFromUser);
    let body = [];
    let finalBody;
    let reqSchemasProperties: any[] = [];
    let resSchemasProperties: any[] = [];
    let filetype;
    if (this.fileType == "application/json" || this.fileType == "application/json") {
      filetype = "json"
    }
    else {
      filetype = "yaml"
    }

    if (this.dataFromUser.length > 0) {
      console.log("lenght dataFromUser", this.dataFromUser.length)
      for (let i = 0; i < this.dataFromUser.length; i++) {
        if (this.dataFromUser[i].method == 'post') {
          for (let k = 0; k < this.dataFromUser[i].reqInput.length; k++) {
            reqSchemasProperties.push({
              "name": this.dataFromUser[i].reqInput[k].name,
              "type": this.dataFromUser[i].reqInput[k].type
            });
          }
          for (let k = 0; k < this.dataFromUser[i].resInput.length; k++) {
            console.log("this.dataFromUser[i].resInput[k].name1", this.dataFromUser[i].resInput[k].name1)
            resSchemasProperties.push({
              "name1": this.dataFromUser[i].resInput[k].name1,
              "type1": this.dataFromUser[i].resInput[k].type1
            })
          }
          console.log("resSchemasProperties", resSchemasProperties)
          console.log("reqSchemasProperties", reqSchemasProperties)
          body.push({
            "keyPath": this.dataFromUser[i].keyPath,
            "method": this.dataFromUser[i].method,
            "tag": this.dataFromUser[i].tag,
            "description": this.dataFromUser[i].discription,
            "reqDes": this.dataFromUser[i].reqDis,
            "response": {
              "two00": "200",
              "four00": "400",
              "four04": "404",
              "four05": "405"
            },
            "reqSchemasName": this.dataFromUser[i].reqSchema,
            "reqSchemasType": "object",
            "reqSchemasProperties": reqSchemasProperties,
            "resSchemasName": this.dataFromUser[i].resSchema,
            "resSchemasType": "object",
            "resSchemasProperties": resSchemasProperties,
            "filename": this.filename,
            "filetype": filetype
          })
        }
        else {
          let parameters = [];
          for (let j = 0; j < this.dataFromUser[i].reqInput.length; j++) {
            parameters.push({
              name: this.dataFromUser[i].reqInput[j].name,
              in: 'query',
              description: this.dataFromUser[i].reqInput[j].type,
              required: true,
              explode: true,
              schema: { type: 'string' }
            });
            resSchemasProperties = [];
            resSchemasProperties.push({
              "name1": this.dataFromUser[i].resInput[j].name1,
              "type1": this.dataFromUser[i].resInput[j].type1
            });
          }
          body.push({
            "keyPath": this.dataFromUser[i].keyPath,
            "method": this.dataFromUser[i].method,
            "tag": this.dataFromUser[i].tag,
            "description": this.dataFromUser[i].discription,
            "reqDes": this.dataFromUser[i].reqDis,
            "response": {
              "two00": "200",
              "four00": "400",
              "four04": "404",
              "four05": "405"
            },
            "reqSchemasName": this.dataFromUser[i].reqSchema,
            "reqSchemasType": "object",
            "parameters": parameters,
            "resSchemasName": this.dataFromUser[i].resSchema,
            "resSchemasType": "object",
            "resSchemasProperties": resSchemasProperties,
            "filename": this.filename,
            "filetype": filetype
          })
        }
      }

      console.log(">>>>>>>><<<<<<<<<", body, this.filename)
      for (let i = 0; i < body.length; i++) {
        if (body[i].keyPath === undefined || body[i].keyPath == null) {
          console.log("Before >>>>>>>", body);
          let index = body.indexOf(body[i].keyPath);
          body.splice(index, 1);
          console.log("After >>>>>>>", body);
          finalBody = body;
          reqSchemasProperties = [];
          resSchemasProperties = [];
        }
        else {
          finalBody = body;
        }
      }
      console.log("<<<<<<<<<BODY>>>>>>>>>>", finalBody)
    }

    this.service.addData(finalBody).then((resp) => {
      console.log("AddData resp ..", resp)
      var responseFromAPI = resp;
      if (this.fileType == "application/json" || this.fileType == "application/json") {
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
          "true": "download",
          "filetype": "json",
          "responseFromAPI": responseFromAPI
        }
        let dialogRef = this.dialog.open(PopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((result: any) => {
          console.log("Closed modal!!!!!");
          window.location.reload();
          this.selectfile = true;
          this.addPath = false;
          this.fileValid = false;
        })
      }
      else {
        const dialogConfig: MatDialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.data = {
          "true": "download",
          "filetype": "yaml",
          "responseFromAPI": responseFromAPI
        }
        let dialogRef = this.dialog.open(PopupComponent, dialogConfig);
        dialogRef.afterClosed().subscribe((result: any) => {
          console.log("Closed modal!!!");
          window.location.reload();
          this.selectfile = true;
          this.addPath = false;
          this.fileValid = false;
        })
      }
    })
    this.formData = {};
    this.inputs = [];
    this.inputs1 = [];
  }

}