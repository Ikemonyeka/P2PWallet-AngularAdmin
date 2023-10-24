import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KycValidationComponent } from '../kyc-validation/kyc-validation.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
export interface reject{
  username: any;
  formCode: any;
  file: any;
  pendingFile: any;
}

@Component({
  selector: 'app-reject-upload',
  templateUrl: './reject-upload.component.html',
  styleUrls: ['./reject-upload.component.css']
})
export class RejectUploadComponent implements OnInit{

  public rejectForm!:FormGroup;
  public rejectFormInvalid: boolean = false;
  public rejectKYCData: any;
  constructor(public dialogRef: MatDialogRef<KycValidationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: reject, private fb: FormBuilder, private auth: AdminAuthService){}


  ngOnInit(): void {
    this.rejectKYCData = this.data
    // console.log(this.rejectKYCData.val.username);

    this.rejectForm = this.fb.group({
      username: [''],
      formCode: [''],
      reason: ['', Validators.required]
    })
  }

  RejectUpload(){
    this.rejectForm.controls['username'].setValue(this.rejectKYCData.val.username)
    this.rejectForm.controls['formCode'].setValue(this.rejectKYCData.val.formCode)

    console.log(this.rejectForm.value);

    if(this.rejectForm.valid){
      this.auth.RejectUpload(this.rejectForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          window.location.reload()
          this.dialogRef.close()
        },
        error: (err) => {
          console.log(err);
        },
      })
    }
    else{
      this.rejectFormInvalid = true
    }
  }

}
