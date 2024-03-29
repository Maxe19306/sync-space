import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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

  validNewPassword0: boolean = false;
  validNewPassword1: boolean = false;
  validNewPasswords: boolean = false;
  newPasswordsIdentically: boolean = true;

  @ViewChild('newPasswordSuccess', { static: false }) newPasswordSuccess: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
  }

  code = this.route.snapshot.queryParams['oobCode'];

  validateNewPassword0(newPassword0: string) {
    const passwordRegex = /^(?=.*[a-zäöü])(?=.*[A-ZÄÖÜ])(?=.*[@#$%^&+=!])(?=.*[a-zA-ZäöüÄÖÜ@#$%^&+=!]).{8,}$/;
    this.validNewPassword0 = passwordRegex.test(newPassword0);
    this.validateNewPasswords();
  }

  validateNewPassword1(newPassword1: string) {
    const passwordRegex = /^(?=.*[a-zäöü])(?=.*[A-ZÄÖÜ])(?=.*[@#$%^&+=!])(?=.*[a-zA-ZäöüÄÖÜ@#$%^&+=!]).{8,}$/;
    this.validNewPassword1 = passwordRegex.test(newPassword1);
    this.validateNewPasswords();
  }

  validateNewPasswords() {
    this.validNewPasswords = this.validNewPassword0 && this.validNewPassword1;
  }

  changeNewPassword(newPassword0, newPassword1) {
    if (newPassword0 !== newPassword1) {
      // Passwörter stimmen NICHT überein, User muss die Eingabe korrgieren
      this.newPasswordsIdentically = false;
    } else {
      // Passwörter stimmen überein, newPassword0 kann an das Backend übergeben werden, routing zum login
      this.newPasswordsIdentically = true;
      this.newPasswordSuccessAnimation();
      this.setNewPassword(newPassword0)
     
    }
  }

  newPasswordSuccessAnimation() {
    this.newPasswordSuccess.nativeElement.classList.add('is__active');
    setTimeout(() => {
      this.newPasswordSuccess.nativeElement.style.display = "none";
    }, 1450);
  }
  
  setNewPassword(newPassword) {
    const auth = getAuth();
  
    confirmPasswordReset(auth, this.code, newPassword)
      .then(() => {
        this.router.navigate(['/login'])
      })
      .catch((error) => {
        console.error(error); // Fehlerbehandlung bei Fehlern beim Zurücksetzen des Passworts
      }); 
  }
}
