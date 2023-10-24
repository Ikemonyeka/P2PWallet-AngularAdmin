import { Component, Inject, OnInit } from '@angular/core';
import { KycValidationComponent } from '../kyc-validation/kyc-validation.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-kyc-image-uploaded',
  templateUrl: './kyc-image-uploaded.component.html',
  styleUrls: ['./kyc-image-uploaded.component.css']
})
export class KycImageUploadedComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<KycValidationComponent>, @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
