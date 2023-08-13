import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent implements OnInit {

  @ViewChild('mail', { static: true }) mailInput: ElementRef<HTMLInputElement>;
  @ViewChild('passwordSuccess', { static: false }) passwordSuccess: ElementRef;

  validEmail: boolean = false;

  validateEmail(email: string) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    this.validEmail = emailRegex.test(email);
  }

  constructor(private afAuth: AngularFireAuth,
    private router: Router) { }

  ngOnInit(): void {
  }

  focusMailResetInput() {
    this.mailInput.nativeElement.focus();
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

    this.passwordSuccessAnimation();
    setTimeout(() => {
      this.router.navigate(['/confirmNewPassword']);
    }, 1600);
  }

  passwordSuccessAnimation() {
    this.passwordSuccess.nativeElement.classList.add('is__active');
    setTimeout(() => {
      this.passwordSuccess.nativeElement.style.display = "none";
    }, 1450);
  }
}
