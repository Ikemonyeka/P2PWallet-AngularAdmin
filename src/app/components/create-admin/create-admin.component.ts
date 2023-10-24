import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-create-admin',
  templateUrl: './create-admin.component.html',
  styleUrls: ['./create-admin.component.css']
})
export class CreateAdminComponent implements OnInit{

  newAdmin!: FormGroup
  constructor(private fb:FormBuilder, private auth: AdminAuthService){}

  ngOnInit(): void {
    this.newAdmin = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")])],
      phoneNumber: ['', Validators.required],
    })
  }

  create(){
    if(this.newAdmin.valid){
      this.auth.adminCreate(this.newAdmin.value)
      .subscribe({
        next:(response)=>{
          console.log(response)
          if(response.status == false){
            alert(response.message)
          }
          else{
            alert(response.message);
            this.newAdmin.reset();
          }
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      //error
      alert('invalid input')
    }
  }
}
