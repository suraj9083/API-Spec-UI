import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-keyc-regi',
  templateUrl: './keyc-regi.component.html',
  styleUrls: ['./keyc-regi.component.scss']
})
export class KeycRegiComponent implements OnInit {

  regiForm: FormGroup;
  submitBtn: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private snackBar: MatSnackBar) {
    this.regiForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required]],
      confpassword: ['', Validators.required]
    }, { validator: this.passwordsMatchValidator });
  }

  ngOnInit() {

  }

  passwordsMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confpassword');

    if (!passwordControl || !confirmPasswordControl) {
      return;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password === confirmPassword) {
      confirmPasswordControl.setErrors(null);
    } else {
      confirmPasswordControl.setErrors({ passwordsNotMatch: true });
    }
  }

  onSubmit() {
    let flag = false;
    var regiKeyValue = this.regiForm?.value;
    for (let key in regiKeyValue) {
      console
      if (regiKeyValue[key] == '') {
        flag = true;
      }
    }
    if(flag == true) {
      this.openSnackBar("Empty field not allowed.", "Cancle")
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['snackbar']
    });
  }

  ngDoCheck() {
  }

}