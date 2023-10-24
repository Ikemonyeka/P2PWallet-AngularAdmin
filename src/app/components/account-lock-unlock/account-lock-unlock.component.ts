import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { AccLockUnlockDescriptionComponent } from '../acc-lock-unlock-description/acc-lock-unlock-description.component';

@Component({
  selector: 'app-account-lock-unlock',
  templateUrl: './account-lock-unlock.component.html',
  styleUrls: ['./account-lock-unlock.component.css']
})
export class AccountLockUnlockComponent implements OnInit{

  dtoptions:DataTables.Settings = {}
  dtTrigger:Subject<any> = new Subject<any>();
  public users:any = [];
  isToggled: boolean = false;

  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  
  constructor(private auth:AdminAuthService, private dialogRef: MatDialog){}



  ngOnInit(): void {
    this.dtoptions = {
      pagingType: 'full',
      lengthMenu: [8],
      lengthChange: false,
      language:{
        searchPlaceholder: 'Search',
        search: ''
      },
  }

  this.auth.getAllUsers()
  .subscribe(response=>{
    this.users = response
    this.dtTrigger.next(null);
    console.log(this.users)
    // response.forEach((x: { status: boolean; }) => {
    //   if(x.status == true){
    //     this.isToggled = true
    //   }
    //   else{
    //     this.isToggled = false
    //   }
    //});
  })
}


currentUser(user: any){
  console.log('Selected user:', user)
  this.auth.EnableProfile(user)
  .subscribe({
    next:(response)=>{
      console.log(response)
    },
    error:(err)=>{
      alert(err?.error.message)
    }
  })
}
}
