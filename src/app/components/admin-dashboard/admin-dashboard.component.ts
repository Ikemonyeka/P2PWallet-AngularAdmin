import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { NewGLcreateGlComponent } from '../new-glcreate-gl/new-glcreate-gl.component';
import { DisplayUserProfileComponent } from '../display-user-profile/display-user-profile.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit{

  public adminCard:any = []
  public conversionCard:any = []
  public summaryTransfer: any = []
  public baseCur?: any;
  public exchangeRate: any;
  constructor(private auth:AdminAuthService, private dialogRef: MatDialog){}

  ngOnInit(): void {
    // this.dialogRef.open(DisplayUserProfileComponent, {
    //   width: '80vw',
    //   height: '80vh',
    //   disableClose: true,
    //   position: {
    //     top: '15vh'
    //   }
    // })

    // this.dialogRef.open(NewGLcreateGlComponent, {
    //   width: '30vw',
    //   disableClose: true
    // }); 

    this.auth.getAdmin()
    .subscribe(response =>{
      this.adminCard = response
      console.log(this.adminCard)
    })

    this.auth.getConversionRate()
    .subscribe(response =>{
      this.conversionCard = response
      console.log(this.conversionCard)
      let base = this.conversionCard.filter((x:any) => x.currency == 'NGN');
      this.baseCur = base[0]
      this.exchangeRate = this.conversionCard.filter((x:any) => x.currency != 'NGN');
      console.log(this.baseCur)
    })

    this.auth.getSummaryTransfer()
    .subscribe(response=>{
      console.log(response)
      this.summaryTransfer = response
    })
  }

  openGL(){
    this.dialogRef.open(NewGLcreateGlComponent, {
      width: '30vw',
      disableClose: true
    })
  }

  openDisplay(){
    this.dialogRef.open(DisplayUserProfileComponent, {
      width: '80vw',
      height: '80vh',
      disableClose: true,
      position: {
        top: '15vh'
      }
    })
  }
}
