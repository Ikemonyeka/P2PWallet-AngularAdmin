import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountLockUnlockComponent } from '../account-lock-unlock/account-lock-unlock.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { Router } from '@angular/router';
export interface profile{
  username: any;
  email: any;
  dateCreated: any;
  status: any;
}

@Component({
  selector: 'app-acc-lock-unlock-description',
  templateUrl: './acc-lock-unlock-description.component.html',
  styleUrls: ['./acc-lock-unlock-description.component.css']
})
export class AccLockUnlockDescriptionComponent implements OnInit{

  public descForm!: FormGroup;
  public currentUserProfile: any;
  public typeOfStatus: any;
  public descriptions: any = [];
  public formError: boolean = false;
  constructor(public dialogRef: MatDialogRef<AccountLockUnlockComponent>,
    @Inject(MAT_DIALOG_DATA) public data: profile, private fb: FormBuilder, private auth: AdminAuthService, private router: Router){}

  ngOnInit(): void {
    this.currentUserProfile = this.data
    if(this.currentUserProfile.status == true){
      this.typeOfStatus = "Unlocked"
    }
    else{
      this.typeOfStatus = "Locked"
    }

    this.auth.getDescriptions()
    .subscribe(response =>{
      console.log(response)
      this.descriptions = response
    })

    this.descForm = this.fb.group({
      user: [this.currentUserProfile.Username],
      email: [this.currentUserProfile.Email],
      description: ['default'],
      status: [this.currentUserProfile.Status]
    })
  }

  lockunlock(){
    console.log(this.data);
    if(this.descForm.valid){
      this.auth.setDescription(this.descForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.dialogRef.close();
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      this.formError = true
    }
  }
}
