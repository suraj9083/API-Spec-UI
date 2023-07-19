import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss']
})
export class MfaComponent implements OnInit {
  qrImg: any;
  secret: String = '';
  token = new FormGroup({
    token: new FormControl(''),
  })

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.service.qr().then((Resp) => {
      console.log(Resp)
      this.qrImg = Resp.qrCodeUrl
      this.secret = Resp.secret
    });
  }

  getVerify() {
    console.log("Token >>>", this.token.value);
    this.service.veriTOTP(this.token.value).then((Resp: any) => {
      if (Resp.status == "success") {
        alert(Resp.msg);
        this.router.navigate(['/spec/edit'])
      }
      else {
        alert(Resp.msg);
        window.location.reload();
      }
    })
  }

}
