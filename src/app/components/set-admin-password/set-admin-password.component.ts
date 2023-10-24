import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

export interface login{
  username: any;
  password: any;
}

@Component({
  selector: 'app-set-admin-password',
  templateUrl: './set-admin-password.component.html',
  styleUrls: ['./set-admin-password.component.css']
})
export class SetAdminPasswordComponent implements OnInit{

  public setPassword!: FormGroup;
  public match: boolean = false;
  public loginUsername: any;

  constructor(public dialogRef: MatDialogRef<AdminLoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: login, private fb: FormBuilder, private auth: AdminAuthService){}

  ngOnInit(): void {

    this.loginUsername = this.data;

    this.setPassword = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)])],
      cpassword: ['', Validators.compose([Validators.required])],
      username: [this.loginUsername.username]
    })


    console.log(this.data)
  }

  matchChecker(){
    if(this.setPassword.controls['password'].value == this.setPassword.controls['cpassword'].value){
      this.match = false;
    } 
    else{
      this.match = true;
    }
  }

  Update(){
    if(this.setPassword.valid){
      if(this.setPassword.controls['password'].value == this.setPassword.controls['cpassword'].value){
        this.match = false;
        //api call
        this.auth.setAdminPassword(this.setPassword.value)
        .subscribe({
          next:(response) => {
            console.log(response);
            this.dialogRef.close();
            window.location.reload();
          },
          error:(err)=>{
            alert(err?.error.message)
          }
        })
      }
      else{
        this.match = true;
      }
    }
    else{
      alert("check you code");
    }
  }
}
