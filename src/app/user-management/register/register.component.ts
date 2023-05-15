import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  regiForm = new FormGroup({
    username: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confpassword: new FormControl('')
  })

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private service: ServiceService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required],],
      password: ['', [Validators.required],]
    })
  }

  toggleForm = () => {
    let container = document.querySelector('.container') as HTMLElement;
    container.classList.toggle('active');
  };

  onRegSubmit() {
    console.log(this.regiForm.value);
    this.service.signup(this.regiForm.value).then((resp) => {
      console.log("signup resp ==.> ", resp)
      if (resp.status == "success") {
        alert(resp.msg)
        window.location.reload();
      }
      else {
        alert(resp.msg)
        window.location.reload();
      }
    })
  }

  onLogSubmit() {
    console.log(this.loginForm.value);
    this.service.signin(this.loginForm.value).then((resp) => {
      console.log("signup resp ==.> ", resp)
      if (resp.status == "Success") {
        this.router.navigate(['/user/mfa']);
      }
      else {
        alert(resp.msg)
        window.location.reload();
      }
    })
  }

}
