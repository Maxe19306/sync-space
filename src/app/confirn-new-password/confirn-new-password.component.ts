import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, confirmPasswordReset, updatePassword, verifyPasswordResetCode } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { getFirestore } from "firebase/firestore";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

@Component({
  selector: 'app-confirn-new-password',
  templateUrl: './confirn-new-password.component.html',
  styleUrls: ['./confirn-new-password.component.scss']
})

export class ConfirnNewPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  validNewPassword0: boolean = false;
  validNewPassword1: boolean = false;
  validNewPasswords: boolean = false;
  newPasswordsIdentically: boolean = true;

  ngOnInit(): void {
  }

  code = this.route.snapshot.queryParams['oobCode'];

  validateNewPassword0(newPassword0: string) {
    const passwordRegex = /^(?=.*[a-zäöü])(?=.*[A-ZÄÖÜ])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[a-zA-ZäöüÄÖÜ\d@#$%^&+=!]).{8,}$/;
    this.validNewPassword0 = passwordRegex.test(newPassword0);
    this.validateNewPasswords();
    console.log("this.validNewPassword0", this.validNewPassword0);
  }

  validateNewPassword1(newPassword1: string) {
    const passwordRegex = /^(?=.*[a-zäöü])(?=.*[A-ZÄÖÜ])(?=.*\d)(?=.*[@#$%^&+=!])(?=.*[a-zA-ZäöüÄÖÜ\d@#$%^&+=!]).{8,}$/;
    this.validNewPassword1 = passwordRegex.test(newPassword1);
    this.validateNewPasswords();
    console.log("this.validNewPassword1", this.validNewPassword1);
  }

  validateNewPasswords() {
    this.validNewPasswords = this.validNewPassword0 && this.validNewPassword1;
    console.log("this.validNewPasswords", this.validNewPasswords);
  }

  changeNewPassword(newPassword0, newPassword1) {
    if (newPassword0 !== newPassword1) {
      // Passwörter stimmen NICHT überein, User muss die Eingabe korrgieren
      this.newPasswordsIdentically = false;
    } else {
      // Passwörter stimmen überein, newPassword0 kann an das Backend übergeben werden
      this.newPasswordsIdentically = true;
    }
  }

  // test(password1) {

  // }

}
