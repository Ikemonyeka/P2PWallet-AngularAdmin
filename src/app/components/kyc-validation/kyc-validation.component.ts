import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { NewKycreqDocComponent } from '../new-kycreq-doc/new-kycreq-doc.component';
import { SuccesfullyDisabledComponent } from '../succesfully-disabled/succesfully-disabled.component';
import { KycImageUploadedComponent } from '../kyc-image-uploaded/kyc-image-uploaded.component';
import { RejectUploadComponent } from '../reject-upload/reject-upload.component';

@Component({
  selector: 'app-kyc-validation',
  templateUrl: './kyc-validation.component.html',
  styleUrls: ['./kyc-validation.component.css']
})
export class KycValidationComponent implements OnInit{
  @ViewChild('downloadLink', { static: false }) downloadLink: any; // Use 'any' type here



  public KYCDocumentList:any;
  public showPending: boolean = false;
  public KYCPendingData: any = [];
  public users: any=[] = new Array().fill({id: -1, Username: '', formCode: '', file: '', pendingFile: ''});
  public pageValue:number = 1;
  public pagesLength:any;
  public PermpagesLength:any;
  constructor(private auth:AdminAuthService, private dialogRef: MatDialog, private renderer: Renderer2){}

  ngOnInit(): void {
    this.auth.GetListKYC()
    .subscribe(response => {
      console.log(response);
      this.KYCDocumentList = response
    })

    this.auth.KYCPending(this.pageValue)
    .subscribe(response => {
      console.log(response);
      this.pageValue = response.page;
      this.pagesLength = response.pageSize;
      console.log(this.pageValue);
      console.log(this.pagesLength);
      // let i = 0;
      // response.users.forEach((x: { username: any; formCode: any; file: any; pendingFile: any; }) => {
      //   this.users[i] = {
      //     id: i,
      //     Username: x.username,
      //     formCode: x.formCode,
      //     file: x.file,
      //     pendingFile: 'data:image/png;base64,' + x.pendingFile
      //   };
      //   i++    
      // });
      const transformedResponse  = response.data.map((x: { key: any; value: any[]; }) => ({
        key: x.key,
        value: x.value.map((innerVal) => ({
          username: innerVal.username,
          formCode: innerVal.formCode,
          file: innerVal.file,
          pendingFile: 'data:image/png;base64,' + innerVal.pendingFile
        })),
        isShow: false,
        pendingCount: x.value.length
      }));

      this.KYCPendingData = transformedResponse
      console.log(this.users);
    })
  }

  downloadFile(dataUrl: string) {
    // Open a new tab with a simple HTML page containing the image
    const newTab = window.open();
    const htmlContent = `<html><body><img src="${dataUrl}" /></body></html>`;
    newTab?.document.write(htmlContent);
  }

  previewFile(imageData:any){
    this.dialogRef.open(KycImageUploadedComponent, {
      width: '80vw',
      disableClose: true,
      data: {imageUrl: imageData}
    })
  }
  
  

  OpenNewKYC(){
    this.dialogRef.open(NewKycreqDocComponent, {
      width: '30vw'
    })
  } 

  

  disableReq(doc: any){
    console.log(doc);
    this.auth.RemoveKYCReq(doc.formCode)
    .subscribe({
      next: (response => {
        console.log(response);
        if(response.status == true){
          setTimeout(() => {
            this.dialogRef.open(SuccesfullyDisabledComponent, {
              width: '30vw',
              disableClose: true
            })
          }, 10000);
          window.location.reload()
        }
      }),
      error: (err) => {
        alert(err?.error.message)
      },
    })
  }

  toggleTable(i: any){
    console.log(i);
    this.KYCPendingData[i].isShow = !this.KYCPendingData[i].isShow;
  }

  openImage(imageUrl: string) {
    // Open the image in a new window or tab
    window.open(imageUrl, '_blank');
  }

  AcceptUploaded(val:any){
    console.log(val);
    this.auth.AcceptUpload(val)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  RejectUploaded(val:any){
    this.dialogRef.open(RejectUploadComponent, {
      width: 'fit-content',
      data: {val}
    })
  }

  PrevNextKYCUpload(direction: any){
    switch (direction) {
      case 'double-left':
        this.pageValue = (this.pageValue - this.pageValue) + 1
        if(this.pageValue > this.pagesLength){
          console.log(direction);
          return;
        }
        this.auth.KYCPending(this.pageValue)
        .subscribe( response => {
        console.log(response)
        this.pageValue = response.page;
        this.pagesLength = response.pageSize;
        this.PermpagesLength = response.page
        let i = 0;
        const transformedResponse  = response.data.map((x: { key: any; value: any[]; }) => ({
          key: x.key,
          value: x.value.map((innerVal) => ({
            username: innerVal.username,
            formCode: innerVal.formCode,
            file: innerVal.file,
            pendingFile: 'data:image/png;base64,' + innerVal.pendingFile
          })),
          isShow: false,
          pendingCount: x.value.length
        }));
  
        this.KYCPendingData = transformedResponse
        })
          break;
      case 'left':
        
        this.pageValue--
        if(this.pageValue > this.pagesLength){
          console.log(direction);
          return;
        }
        this.auth.KYCPending(this.pageValue)
        .subscribe( response => {
        console.log(response)
        this.pageValue = response.page;
        this.pagesLength = response.pageSize;
        this.PermpagesLength = response.page
        let i = 0;
        const transformedResponse  = response.data.map((x: { key: any; value: any[]; }) => ({
          key: x.key,
          value: x.value.map((innerVal) => ({
            username: innerVal.username,
            formCode: innerVal.formCode,
            file: innerVal.file,
            pendingFile: 'data:image/png;base64,' + innerVal.pendingFile
          })),
          isShow: false,
          pendingCount: x.value.length
        }));
  
        this.KYCPendingData = transformedResponse
        })
          break;
      case 'right':
          this.pageValue++
          if(this.pageValue > this.pagesLength){
            console.log(direction);
            return;
          }
          this.auth.KYCPending(this.pageValue)
          .subscribe( response => {
          console.log(response)
          this.pageValue = response.page;
          this.pagesLength = response.pageSize;
          this.PermpagesLength = response.page
          let i = 0;
          const transformedResponse  = response.data.map((x: { key: any; value: any[]; }) => ({
            key: x.key,
            value: x.value.map((innerVal) => ({
              username: innerVal.username,
              formCode: innerVal.formCode,
              file: innerVal.file,
              pendingFile: 'data:image/png;base64,' + innerVal.pendingFile
            })),
            isShow: false,
            pendingCount: x.value.length
          }));
    
          this.KYCPendingData = transformedResponse
          })
          break;
      case 'double-right':
        this.pageValue = this.pagesLength
        if(this.pageValue > this.pagesLength){
          console.log(direction);
          return;
        }
        this.auth.KYCPending(this.pageValue)
        .subscribe( response => {
        console.log(response)
        this.pageValue = response.page;
        this.pagesLength = response.pageSize;
        this.PermpagesLength = response.page
        let i = 0;
        const transformedResponse  = response.data.map((x: { key: any; value: any[]; }) => ({
          key: x.key,
          value: x.value.map((innerVal) => ({
            username: innerVal.username,
            formCode: innerVal.formCode,
            file: innerVal.file,
            pendingFile: 'data:image/png;base64,' + innerVal.pendingFile
          })),
          isShow: false,
          pendingCount: x.value.length
        }));
  
        this.KYCPendingData = transformedResponse
        })
          break;
      default:
          console.log("ts error")
          break;
    }
  }
}
