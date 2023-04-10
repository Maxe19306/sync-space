import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const searchInput = document.getElementById("searchInput");
    const searchIcon = document.getElementById("searchIcon");

    searchInput.addEventListener("input", (event) => {
      const searchInput = <HTMLInputElement>document.getElementById("searchInput");
      if (searchInput.value.length > 0) searchIcon.style.display = 'none';
      else searchIcon.style.display = 'inline-block';
    });
  }

}
