import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(document).ready(function () {

      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });

    });
  }

}
