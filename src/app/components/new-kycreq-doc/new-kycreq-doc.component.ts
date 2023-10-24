import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { KycValidationComponent } from '../kyc-validation/kyc-validation.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-kycreq-doc',
  templateUrl: './new-kycreq-doc.component.html',
  styleUrls: ['./new-kycreq-doc.component.css']
})
export class NewKycreqDocComponent implements OnInit{
  

  public newKYCForm!: FormGroup;
  public successfulResponse: boolean = false;
  public failedResponse: boolean = false

  constructor(public dialogRef: MatDialogRef<KycValidationComponent>, private auth:AdminAuthService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.newKYCForm = this.fb.group({
      documentName: ['', Validators.required]
    })
  }


  createKYCDocument(){
    if(this.newKYCForm.valid){
      this.auth.CreateNewKYCField(this.newKYCForm.value)
    .subscribe({
      next: (response) => {
        console.log(response)
        if(response.status == true){
          this.successfulResponse = true
          setTimeout(() => {
            // Close the dialog when the timer expires.
            this.dialogRef.close();
            this.successfulResponse = false
          }, 4000);
          window.location.reload()
        }
        else{
          this.failedResponse = true;
          setTimeout(() => {
            this.failedResponse = false
          }, 4000);
        }
      },
      error:(err)=>{
        alert(err?.error.message)
      }
    })
    }
    else{
      this.failedResponse = true;
      setTimeout(() => {
        this.failedResponse = false
      }, 2000);
    }
  }
}
