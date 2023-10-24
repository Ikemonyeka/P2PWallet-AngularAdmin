import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CreateAdminComponent } from './components/create-admin/create-admin.component';
import { AccountLockUnlockComponent } from './components/account-lock-unlock/account-lock-unlock.component';
import { AccLockUnlockDescriptionComponent } from './components/acc-lock-unlock-description/acc-lock-unlock-description.component';
import { SetAdminPasswordComponent } from './components/set-admin-password/set-admin-password.component';
import { NewGLcreateGlComponent } from './components/new-glcreate-gl/new-glcreate-gl.component';
import { DisplayUserProfileComponent } from './components/display-user-profile/display-user-profile.component';
import { KycValidationComponent } from './components/kyc-validation/kyc-validation.component';
import { NewKycreqDocComponent } from './components/new-kycreq-doc/new-kycreq-doc.component';
import { SuccesfullyDisabledComponent } from './components/succesfully-disabled/succesfully-disabled.component';
import { KycImageUploadedComponent } from './components/kyc-image-uploaded/kyc-image-uploaded.component';
import { RejectUploadComponent } from './components/reject-upload/reject-upload.component';

const routes: Routes = [
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'admin-main', component:AdminMainComponent, children: [
    {path: 'admin-dashboard', component:AdminDashboardComponent},
    {path: 'create-admin', component:CreateAdminComponent},
    {path: 'account-lock-unlock', component:AccountLockUnlockComponent},
    {path: 'lock-unlock-desc', component:AccLockUnlockDescriptionComponent},
    {path: 'set-admin-password', component:SetAdminPasswordComponent},
    {path: 'new-glcreate', component:NewGLcreateGlComponent},
    {path: 'display-user-profile', component:DisplayUserProfileComponent},
    {path: 'kyc-validation', component:KycValidationComponent},
    {path: 'new-kyc', component:NewKycreqDocComponent},
    {path: 'disabled', component:SuccesfullyDisabledComponent},
    {path: 'image-view', component:KycImageUploadedComponent},
    {path: 'reject_upload', component:RejectUploadComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
