import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from 'src/app/service/service.service';
import { PopupComponent } from '../popup/popup.component';
import { FieldType, FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import * as yaml from 'js-yaml'

@Component({
  selector: 'app-edit-on-apispec',
  templateUrl: './edit-on-apispec.component.html',
  styleUrls: ['./edit-on-apispec.component.scss']
})
export class EditOnApispecComponent implements OnInit {
  selectedFile!: File | null;
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
  myForm: FormGroup<any> = new FormGroup({
    kp: new FormControl('')
  });;
  fileValid: boolean = false;
  filename: string = '';

  constructor(private service: ServiceService, private dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      kp: ['', [Validators.required],]
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }

  onFileSelected(event: any) {
    this.selectedFile = null;
    this.submitBtn = true;
    this.selectedFile = event.target.files[0];
    if (this.selectedFile === undefined) {
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
    console.log("called")
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

  Submit() {
    this.formData['reqInput'] = this.inputs;
    this.formData['resInput'] = this.inputs1
    this.dataFromUser.push(this.formData)
    console.log(this.dataFromUser);
    let body;
    let reqSchemasProperties: any[] = [];
    let resSchemasProperties: any[] = [];
    let filetype;
    if (this.fileType == "application/json" || this.fileType == "application/json") {
      filetype = "json"
    }
    else {
      filetype = "yaml"
    }

    if (this.formData.resInput.length > 0) {
      for (let k = 0; k < this.formData.resInput.length; k++) {
        resSchemasProperties.push({
          "name": this.formData.resInput[k].name1,
          "type": this.formData.resInput[k].type1
        })
      }
    }

    if (this.dataFromUser.length > 0) {
      for (let i = 0; i < this.dataFromUser.length; i++) {
        if (this.dataFromUser[i].method == 'post') {
          if (this.formData.reqInput.length > 0) {
            for (let j = 0; j < this.formData.reqInput.length; j++) {
              reqSchemasProperties.push({
                "name": this.formData.reqInput[j].name,
                "type": this.formData.reqInput[j].type
              })
            }
          }
          body = {
            "keyPath": this.dataFromUser[i].keyPath,
            "method": this.dataFromUser[i].method,
            "tag": this.dataFromUser[i].tag,
            "description": this.dataFromUser[i].discription,
            "reqBody": {
              "description": this.dataFromUser[i].reqDis
            },
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
          }
        }
        else {
          let parameters = []
          if (this.formData.reqInput.length > 0) {
            for (let j = 0; j < this.formData.reqInput.length; j++) {
              parameters.push({
                name: this.formData.reqInput[j].name,
                in: 'query',
                description: this.formData.reqInput[j].type,
                required: true,
                explode: true,
                schema: { type: 'string' }
              })
            }
          }
          body = {
            "keyPath": this.dataFromUser[i].keyPath,
            "method": this.dataFromUser[i].method,
            "tag": this.dataFromUser[i].tag,
            "description": this.dataFromUser[i].discription,
            "reqBody": {
              "description": this.dataFromUser[i].reqDis
            },
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
          }
        }
      }
    }

    this.service.addData(body).then((resp) => {
      console.log("AddData resp ..", resp)
      var responseFromAPI = resp;
      if (this.fileType == "application/json" || this.fileType == "application/json") {
        const jsonContent = JSON.stringify(responseFromAPI);
        const blob = new Blob([jsonContent], { type: 'application/json' });
        saveAs(blob, 'api-spec.json');
      }
      else {
        const yamlContent = yaml.dump(responseFromAPI);
        const blob = new Blob([yamlContent], { type: 'application/x-yaml' });
        saveAs(blob, 'api-spec.yaml');
      }
    })
    this.formData = {};
    this.inputs = [];
    this.inputs1 = [];
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
        this.fileName = resp.filename;
        this.showFileName = true;
        this.submitBtn = false;
        this.submitBtn1 = true;
        this.fileValid = false;
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

  validateFilename(name: any) {
    let body;
    if (this.fileType == "application/json" || this.fileType == "application/json") {
      body = {
        "filename": name,
        "type": "JSON"
      }
      this.filename = name;
    }
    else {
      body = {
        "filename": name,
        "type": "YAML"
      }
      this.filename = name;
    }
    this.service.validateFilename(body).then((resp: any) => {
      console.log("Resp>>>", resp);
      if (resp.msg == 'file valid!!') {
        this.showFileName = false;
        this.fileValid = true;
      }
    })
  }

}