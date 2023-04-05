import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { GeneralViewComponent } from './general-view/general-view.component';

const routes: Routes = [
  {path: 'signin', component: SignInComponent},
  {path: '', component: LoginComponent},
  {path: 'generalView', component: GeneralViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
