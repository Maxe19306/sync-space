import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, sendPasswordResetEmail} from "firebase/auth";



@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  validEmail: boolean = false;

  validateEmail(email: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    this.validEmail = emailRegex.test(email);
  }

  constructor(private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }


  resetPassword(email) {
    const actionCodeSettings = {
      url: "http://localhost:4200/confirmNewPassword",
    };
    const auth = getAuth();
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {

      })
      .catch((error) => {
        console.error(error);
      });
  }

  
}
