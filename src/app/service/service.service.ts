import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url = 'http://localhost:4000'
  constructor(private http: HttpClient) { }

  specReader(file: any): Promise<any> {
    console.log("specReader api called")
    const formData = new FormData();
    formData.append('file', file);
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/api/tempdyno/v1/upload", formData).pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("resend otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

  addData(body: any): Promise<any> {
    console.log("addData api called");
    return new Promise((resolve, reject) => {
      this.http.post(this.url + `/api/tempdyno/v1/addData?filename=${body[0].filename}&fileType=${body[0].filetype}`, body).pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("resend otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

  getFileName(file: any): Promise<any> {
    console.log("specReader api called")
    const formData = new FormData();
    formData.append('file', file);
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/api/tempdyno/v1/giveFileName", formData).pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("resend otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

  uploadXlsx(file: any, body: any): Promise<any> {
    console.log("specReader api called")
    const formData = new FormData();
    formData.append('file', file);
    return new Promise((resolve, reject) => {
      this.http.post(this.url + `/api/tempdyno/v1/uploadXlsx?filename=${body.filename}&fileType=${body.fileType}`, formData).pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("resend otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

  validateFilename(body: any): Promise<any> {
    console.log("specReader api called")
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/api/tempdyno/v1/filename", body).pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("resend otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

  signup(body: any): Promise<any> {
    console.log("signup api called")
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/user/signup", body).pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("resend otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

  signin(body: any): Promise<any> {
    console.log("signup api called")
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/user/signin", body).pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("resend otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

  qr(): Promise<any> {
    console.log("qr api called")
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "/mfa/qr").pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("resend otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

  veriTOTP(body: any): Promise<any> {
    console.log("verify api called")
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/mfa/verify", body).pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("veriOTP otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

  makePostman(body: any): Promise<any> {
    console.log("makePostman api called")
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/api/tempdyno/v1/makePsCollection", body).pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("veriOTP otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

  import(body: any): Promise<any> {
    console.log("importCollection api called")
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/api/tempdyno/v1/importCollection", body).pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("veriOTP otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

  specification(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + "/postman/editspecification").pipe(map(Response => Response))
        .subscribe((response: any) => {
          // console.log("veriOTP otp API response:", response)
          resolve(response);
        }, reject)
    })
  }

}
