import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { GeneralViewComponent } from './general-view/general-view.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { ConfirnNewPasswordComponent } from './confirn-new-password/confirn-new-password.component';
import { ChannelViewComponent } from './channel-view/channel-view.component';

const routes: Routes = [
  {path: 'signin', component: SignInComponent},
  {path: '', component: LoginComponent},
  {path: 'generalView', component: GeneralViewComponent},
  {path: 'resetPassword', component: ResetPasswordComponent},
  {path: 'profil', component: ProfileViewComponent},
  {path: 'confirmNewPassword', component: ConfirnNewPasswordComponent},
  {path: 'channel', component: ChannelViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
