import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  private baseUrl:string = "https://localhost:7025/api/";
  constructor(private http: HttpClient) { }

  adminLogin(login:any){
    return this.http.post<any>(`${this.baseUrl}Admin/Login`, login)
  }
  
  setToken(data: string){
    localStorage.setItem('token', data)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  getAdmin(){
    return this.http.get<any>(`${this.baseUrl}Admin/GetAdmin`)
  }

  getConversionRate(){
    return this.http.get<any>(`${this.baseUrl}Admin/Currencies`)
  }

  getSummaryTransfer(){
    return this.http.get<any>(`${this.baseUrl}Admin/SummaryOfTransfers`)
  }

  adminCreate(create:any){
    return this.http.post<any>(`${this.baseUrl}Admin/Register`, create)
  }
  
  getAllUsers(){
    return this.http.get<any>(`${this.baseUrl}Admin/AllUsers`)
  }

  profileStatus(status:any){
    return this.http.post<any>(`${this.baseUrl}Admin/ProfileStatus`, status)
  }

  getDescriptions(){
    return this.http.get<any>(`${this.baseUrl}Admin/Descriptions`)
  }

  setDescription(desc:any){
    return this.http.post<any>(`${this.baseUrl}Admin/LockedOrUnlockedDesc`, desc)
  }

  setAdminPassword(desc:any){
    return this.http.post<any>(`${this.baseUrl}Admin/SetAdminPassword`, desc)
  }

  createNewGl(gl:any){
    return this.http.post<any>(`${this.baseUrl}GL/CreateGL`, gl)
  }

  searchUser(find:any){
    return this.http.get<any>(`${this.baseUrl}Admin/FindUser?page=${find}`)
  }

  unread(){
    return this.http.get<any>(`${this.baseUrl}Chat/Unread`)
  }

  getUserChatByUsername(gl:any){
    return this.http.get<any>(`${this.baseUrl}Chat/UsersChats?user=${gl}`)
  }

  NewChatAdmin(chat:any){
    return this.http.post<any>(`${this.baseUrl}Chat/ChatAdmin`, chat)
  }

  SearchUserDisplay(){
    return this.http.get<any>(`${this.baseUrl}Admin/SearchUser`)
  }

  CreateNewKYCField(newKYC:any){
    return this.http.post<any>(`${this.baseUrl}KYC/CreateNewKYCField`, newKYC)
  }

  GetListKYC(){
    return this.http.get<any>(`${this.baseUrl}KYC/GetListKYC`)
  }

  RemoveKYCReq(disableKYCreq:any){
    return this.http.post<any>(`${this.baseUrl}KYC/RemoveKYCReq?code=${disableKYCreq}`, null)
  }

  KYCPending(page:any){
    return this.http.get<any>(`${this.baseUrl}KYC/KYCPending?page=${page}`)
  }

  EnableProfile(status:any){
    return this.http.post<any>(`${this.baseUrl}Admin/EnableProfile`, status)
  }

  AcceptUpload(upload:any){
    return this.http.post<any>(`${this.baseUrl}KYC/AcceptUpload`, upload)
  }

  RejectUpload(upload:any){
    return this.http.post<any>(`${this.baseUrl}KYC/RejectUpload`, upload)
  }
}
