import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {
  thread = false;
  currentUser
  constructor(
  private route: ActivatedRoute,
  public dataService : DataService,
  private firestore: AngularFirestore) { }

  ngOnInit(): void { 
      this.dataService.id = this.route.snapshot.queryParamMap.get('userID') 
            this.loadCurrentUser()      
  }
  loadCurrentUser(){
      this.firestore
      .collection('users')
      .doc(this.dataService.id)
      .valueChanges({idField: 'customerID'})
      .subscribe((user)=>{
        this.currentUser = user;
        console.log(this.currentUser)
      })
  }
   }
    
  

