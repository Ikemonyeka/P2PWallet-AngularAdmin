import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { SetAdminPasswordComponent } from '../set-admin-password/set-admin-password.component';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{

  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private auth:AdminAuthService, private router: Router, private dialogRef: MatDialog){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

    // this.dialogRef.open(SetAdminPasswordComponent,{
    //   width: '30vw',
    //   disableClose: true,
    //   position: {
    //     left: '36.5vw'
    //   } 
    // })
  }

  Submit(){
    if(this.loginForm.valid){
      //backend
      this.auth.adminLogin(this.loginForm.value)
      .subscribe({
        next:(response)=>{
          if(response.status === false && response.data === false){
            alert(response.message)
          }
          else if (response.status === true && response.data === false){
            //ngIf for set password
            this.dialogRef.open(SetAdminPasswordComponent,{
              width: '30vw',
              disableClose: true,
              data: this.loginForm.value,
              position: {
                left: '36.5vw'
              } 
            })
          }
          else{
            alert(response.message)
            this.auth.setToken(response.dt)
            this.router.navigate(['/admin-main/admin-dashboard'])
          }
          console.log(response)
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      //throw error
      console.log("invalid form")
    }
  }
}
