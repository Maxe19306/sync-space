import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {

  userID = this.route.snapshot.queryParamMap.get('userID');
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void { 
      
  }
   }
    
  

