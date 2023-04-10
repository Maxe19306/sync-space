import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-view',
  templateUrl: './general-view.component.html',
  styleUrls: ['./general-view.component.scss']
})
export class GeneralViewComponent implements OnInit {

  myArray = JSON.parse(this.route.snapshot.queryParamMap.get('myArray'));

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
   
    
  }
}
