import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-routefiles',
  templateUrl: './upload-routefiles.component.html',
  styleUrls: ['./upload-routefiles.component.scss']
})
export class UploadRoutefilesComponent implements OnInit {
  selectedFile!: File | null;
  public loading = true;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    },5000);
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

  onFileSelected(event: any) {
    this.selectedFile = null;
    this.selectedFile = event.target.files[0];
    if (this.selectedFile === undefined) {
      console.log("selectedFile ==> ", this.selectedFile)

    }
    else {
      console.log("selectedFile ==> ", this.selectedFile)
    }
  }

  onSubmit() {
    console.log("onSubmit called")
  }

}
