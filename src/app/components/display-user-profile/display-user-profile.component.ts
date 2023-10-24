import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccLockUnlockDescriptionComponent } from '../acc-lock-unlock-description/acc-lock-unlock-description.component';

@Component({
  selector: 'app-display-user-profile',
  templateUrl: './display-user-profile.component.html',
  styleUrls: ['./display-user-profile.component.css']
})
export class DisplayUserProfileComponent implements OnInit{

  public searchForm!: FormGroup
  public searchReturn: any;
  public users: any=[] = new Array().fill({id: -1, Username: '', Email: '', dateCreated: '', Status: false});
  public searchData: any=[] = new Array().fill({id: -1, Username: '', Email: '', dateCreated: '', Status: false});
  public searchFilter: any=[] = new Array().fill({id: -1, Username: '', Email: '', dateCreated: '', Status: false});
  public usersSearch: any=[] = new Array().fill({id: -1, Username: '', Email: '', dateCreated: '', Status: false});
  public arrCount: any;
  public X: any;
  public pageValue:number = 1;
  public pagesLength:any;
  public PermpagesLength:any;
  public isToggled: boolean = false;
  constructor(public dialogRef: MatDialogRef<AdminDashboardComponent>, private auth: AdminAuthService, private fb: FormBuilder, private dialog: MatDialog){}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      identifier: ['']
    })

    this.auth.searchUser(this.pageValue)
    .subscribe( response => {
      console.log(response)
      this.pageValue = response.currentpage;
      this.pagesLength = response.pages
      let i = 0;
      response.users.forEach((x: { user: any; email: any; dateCreated: any; status: any; }) => {
        this.users[i] = {
          id: i,
          Username: x.user,
          Email: x.email,
          Status: x.status,
          dateCreated: x.dateCreated
        };
        i++        
      });
      this.usersSearch = this.users
      this.searchData = this.users
      console.log(this.usersSearch);
    })

    
    this.auth.SearchUserDisplay()
    .subscribe( response => {
      // console.log(response)
      let i = 0;
      response.forEach((x: { user: any; email: any; dateCreated: any; status: any; }) => {
        this.searchFilter[i] = {
          id: i,
          Username: x.user,
          Email: x.email,
          Status: x.status,
          dateCreated: x.dateCreated
        };
        i++        
      });
    })
  }

  closeDialog(){
    this.dialogRef.close()
  }

  search(){
    let searchInput = this.searchForm.controls['identifier'].value
    console.log(this.searchData);
    if(searchInput == ""){
      this.users = this.searchData
      return 
    }
    console.log("Search Input:", searchInput);
    let output = this.searchFilter.filter((x:any) => x.Username.toLowerCase().includes(searchInput) 
    || x.Email.toLowerCase().includes(searchInput))
    console.log(output)
    this.users = output
  }

  PrevNextPage(direction: string){
    // console.log(this.pageValue + " " + this.pagesLength)
    switch (direction) {
      case 'double-left':
        this.pageValue = (this.pageValue - this.pageValue) + 1
        if(this.pageValue > this.pagesLength){
          console.log(direction);
          return;
        }
        this.auth.searchUser(this.pageValue)
        .subscribe( response => {
        console.log(response)
        this.pageValue = response.currentpage;
        this.pagesLength = response.pages
        this.PermpagesLength = response.pages
        let i = 0;
        response.users.forEach((x: { user: any; email: any; dateCreated: any; status: any; }) => {
          this.users[i] = {
            id: i,
            Username: x.user,
            Email: x.email,
            Status: x.status,
            dateCreated: x.dateCreated
          };
          i++        
        });
        })
          break;
      case 'left':
        
        this.pageValue--
        if(this.pageValue > this.pagesLength){
          console.log(direction);
          return;
        }
        this.auth.searchUser(this.pageValue)
        .subscribe( response => {
        console.log(response)
        this.pageValue = response.currentpage;
        this.pagesLength = response.pages
        this.PermpagesLength = response.pages
        let i = 0;
        response.users.forEach((x: { user: any; email: any; dateCreated: any; status: any; }) => {
          this.users[i] = {
            id: i,
            Username: x.user,
            Email: x.email,
            Status: x.status,
            dateCreated: x.dateCreated
          };
          i++        
        });
        })
          break;
      case 'right':
          this.pageValue++
          if(this.pageValue > this.pagesLength){
            console.log(direction);
            return;
          }
          this.auth.searchUser(this.pageValue)
          .subscribe( response => {
          console.log(response)
          this.pageValue = response.currentpage;
          this.pagesLength = response.pages
          this.PermpagesLength = response.pages
          let i = 0;
          response.users.forEach((x: { user: any; email: any; dateCreated: any; status: any; }) => {
            this.users[i] = {
              id: i,
              Username: x.user,
              Email: x.email,
              Status: x.status,
              dateCreated: x.dateCreated
            };
            i++        
          });
          })
          break;
      case 'double-right':
        this.pageValue = this.pagesLength
        if(this.pageValue > this.pagesLength){
          console.log(direction);
          return;
        }
        this.auth.searchUser(this.pageValue)
        .subscribe( response => {
        console.log(response)
        this.pageValue = response.currentpage;
        this.pagesLength = response.pages
        this.PermpagesLength = response.pages
        let i = 0;
        response.users.forEach((x: { user: any; email: any; dateCreated: any; status: any; }) => {
          this.users[i] = {
            id: i,
            Username: x.user,
            Email: x.email,
            Status: x.status,
            dateCreated: x.dateCreated
          };
          i++        
        });
        })
          break;
      default:
          console.log("ts error")
          break;
    }
  }

  currentUser(user: any){
    console.log('Selected user:', user)
    this.auth.profileStatus(user)
    .subscribe({
      next:(response)=>{
        console.log(response)
        if(response.status == true){
          this.dialog.open(AccLockUnlockDescriptionComponent,{
            width: 'fit-content',
            data: user,
            disableClose: true
          })
        }
        else{
          alert(response.message)
        }
      },
      error:(err)=>{
        alert(err?.error.message)
      }
    })
  }
}
