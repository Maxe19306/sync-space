import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, confirmPasswordReset, updatePassword, verifyPasswordResetCode } from "firebase/auth";
import { environment } from 'src/environments/environment';
import { getFirestore } from "firebase/firestore";
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';


@Component({
  selector: 'app-confirn-new-password',
  templateUrl: './confirn-new-password.component.html',
  styleUrls: ['./confirn-new-password.component.scss']
})


export class ConfirnNewPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }
 
  
  code = this.route.snapshot.queryParams['oobCode'];

  test(newPassword){
    console.log(this.code, newPassword)
    
      
  }

    
  
}
