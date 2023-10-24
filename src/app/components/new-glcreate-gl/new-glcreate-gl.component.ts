import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';

@Component({
  selector: 'app-new-glcreate-gl',
  templateUrl: './new-glcreate-gl.component.html',
  styleUrls: ['./new-glcreate-gl.component.css']
})
export class NewGLcreateGlComponent implements OnInit{

  public createGL!: FormGroup;  
  public currList: any = [];
  public formError: boolean = false
  constructor(public dialogRef: MatDialogRef<AdminDashboardComponent>, private auth:AdminAuthService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.auth.getConversionRate()
    .subscribe(response => {
      this.currList = response
    })

    this.createGL = this.fb.group({
      glName: ['', Validators.required],
      glCurrency: ['default', Validators.required]
    })
  }

  createGl(){
    if(this.createGL.valid){
      this.auth.createNewGl(this.createGL.value)
      .subscribe({
        next: (response) => {
          console.log(response)
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
