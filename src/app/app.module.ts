import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminTokenInterceptor } from './interceptors/admin-token.interceptor';
import { CreateAdminComponent } from './components/create-admin/create-admin.component';
import { AccountLockUnlockComponent } from './components/account-lock-unlock/account-lock-unlock.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms'
import { MatTableModule } from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { AccLockUnlockDescriptionComponent } from './components/acc-lock-unlock-description/acc-lock-unlock-description.component';
import { SetAdminPasswordComponent } from './components/set-admin-password/set-admin-password.component';
import { NewGLcreateGlComponent } from './components/new-glcreate-gl/new-glcreate-gl.component';
import { DisplayUserProfileComponent } from './components/display-user-profile/display-user-profile.component';
import { KycValidationComponent } from './components/kyc-validation/kyc-validation.component';
import { NewKycreqDocComponent } from './components/new-kycreq-doc/new-kycreq-doc.component';
import { SuccesfullyDisabledComponent } from './components/succesfully-disabled/succesfully-disabled.component';
import { KycImageUploadedComponent } from './components/kyc-image-uploaded/kyc-image-uploaded.component';
import { RejectUploadComponent } from './components/reject-upload/reject-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    AdminMainComponent,
    AdminDashboardComponent,
    CreateAdminComponent,
    AccountLockUnlockComponent,
    AccLockUnlockDescriptionComponent,
    SetAdminPasswordComponent,
    NewGLcreateGlComponent,
    DisplayUserProfileComponent,
    KycValidationComponent,
    NewKycreqDocComponent,
    SuccesfullyDisabledComponent,
    KycImageUploadedComponent,
    RejectUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    DataTablesModule,
    FormsModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: AdminTokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
