import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: [
    './feedback.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class FeedbackComponent implements OnInit {  
  dummy = Array(10);
  dtOptions: DataTables.Settings = {};
  constructor(
    private api: ApisService,
  ) {
   
  }

  ngOnInit() {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 10,
      lengthChange:false,
      processing: true,
      searching:false,
      info:false,
      
    };
  }
}
