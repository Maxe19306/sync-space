import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import { User } from '../models/user.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: User = new User({});
  
  constructor(
    public firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
  }

  createAccount(password, userForm){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth,this.user.mail, password.value)
    .then((userCredential) =>
    {
      this.addNewUserToFirebase(userCredential.user.uid, userForm)
    })
    password.value = '';
  }


    addNewUserToFirebase(userID, userForm){
      this.user.uid = userID
      console.log(this.user)
      userForm.reset()
}
}
