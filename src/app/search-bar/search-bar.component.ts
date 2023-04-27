import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  allUsers;
  allChannels;
  filteredUsers;
  filteredChannels;
  inputParticipants
  constructor(
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.loadAllUsers()
    this.loadAllChannels()
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");

    searchInput.addEventListener("input", (event) => {
      const searchInput = <HTMLInputElement>document.getElementById("searchInput");
      if (searchInput.value.length > 0) searchIcon.style.display = 'none';
      else searchIcon.style.display = 'inline-block';
    });

   
  }

  loadAllChannels(){
    this.firestore
    .collection('channels')
    .valueChanges({idField: 'customIdName'})
    .subscribe((channels:any) => {
     this.allChannels = channels
     console.log(this.allChannels)
 })
  }

  loadAllUsers(){
    this.firestore
    .collection('users')
    .valueChanges({idField: 'customIdName'})
    .subscribe((user:any) => {
     this.allUsers = user
 })
  }


  Search() {
    this.filteredUsers = this.allUsers.filter(user => 
          user.Name
         .toLowerCase()
         .includes(this.inputParticipants.toLowerCase())
  );
  console.log(this.filteredUsers)

  this.filteredChannels = this.allChannels.filter(user => 
    user.Name
   .toLowerCase()
   .includes(this.inputParticipants.toLowerCase())
);
console.log(this.filteredChannels)
  }
}
