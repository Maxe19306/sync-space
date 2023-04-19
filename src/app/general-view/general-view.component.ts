import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {
  
  

  constructor(private route: ActivatedRoute,
  public dataService : DataService,) { }

  ngOnInit(): void { 
      this.dataService.id = this.route.snapshot.queryParamMap.get('userID')  
  }
   }
    
  

