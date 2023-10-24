import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'jquery';
import * as signalR from '@microsoft/signalr';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit{

  adminChatForm!: FormGroup;
  public unreadList: any = []
  public messages: any;
  public showChat: boolean = false;
  public showMessageLog: boolean = false;
  public user: any;
  public currentUser: any
  constructor(private router:Router, private auth: AdminAuthService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.auth.unread()
    .subscribe(response => {
      // console.log(response)
      let i = 0;
      const transformedResponse = response.map((x: { key: any; value: any[]; }) => ({
        key: x.key,
        count: x.value.length
      }));
  
      this.unreadList = transformedResponse
      console.log(this.unreadList);
      // console.log(transformedResponse)
      // response.map((x) => {
      //   key: x.key,
      //   count: x.values.length
      // })
      // response.map((x: { username: any; }) => {
      //   this.unreadList[i] = {
      //     id: i,
      //     Username: x.username,
      //     messageCount: i + 1
      //   }
      //   i++;
      // });
      // console.log(i)
    })

    this.adminChatForm = this.fb.group({
      message: ['', Validators.required],
      username: ['', Validators.required]
    })

    const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7025/alert")
    .build();

    connection.on("ChatUser",(username,message)=> {
      if(username == this.user){
        // alert(message)

        this.auth.getUserChatByUsername(this.user)
        .subscribe({
        next: (response) => {
          console.log(response)
          this.messages = response;
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
      }
      else{
        this.auth.unread()
    .subscribe(response => {
      // console.log(response)
      let i = 0;
      const transformedResponse = response.map((x: { key: any; value: any[]; }) => ({
        key: x.key,
        count: x.value.length
      }));
  
      this.unreadList = transformedResponse
      console.log("New unread list: ",this.unreadList);
      })
      }

      })

    connection.start()
    .then(() => {
      console.log("connection started-main");
    })
    .catch((error) => {
      console.error("connection ikem said failed:", error);
    });
  }

  logout(){
    window.localStorage.clear()
    this.router.navigate(['admin-login'])
  }

  toggleChat(){
    this.showChat = !this.showChat
  }

  viewChats(){
    this.showMessageLog = !this.showMessageLog
  }

  adminChat(){
    this.auth.NewChatAdmin(this.adminChatForm.value)
    .subscribe({
      next: (response) => {
        console.log(response);
      },
        error:(err)=>{
          alert(err?.error.message)
        }
    })
  }

  getUserChat(unread: any){
    	console.log("Unread:", unread)
      this.user = unread.key

      this.adminChatForm.controls['username'].setValue(unread.key)

      this.auth.getUserChatByUsername(unread.key)
      .subscribe({
        next: (response) => {
          console.log(response)
          this.messages = response;
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
      this.showMessageLog = false
  }
}
