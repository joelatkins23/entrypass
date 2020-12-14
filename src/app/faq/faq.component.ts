import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';

@Component({
  selector: 'app-home',
  templateUrl: './faq.component.html',
  styleUrls: [
    './faq.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class FaqComponent implements OnInit { 
  selected_type="all";
  faqsdata: any[] = [];
  alldata:any[] = []; 
  visible = false;
  constructor(
    private api: ApisService,
  ) {
    this.getfaqslist();
  }

  ngOnInit() {   
  }
  getfaqslist() {
    this.api.getfaqslist().subscribe(resp => {
          this.faqsdata=resp['data'];
          this.alldata=resp['data'];
      }, err => {
          console.log(err);
      });
  }
  changevisible = () => {
    this.visible = !this.visible;
}
  type_change(type){
      this.selected_type=type;
      if(type=='all'){
          this.faqsdata=this.alldata;
      }else{
          this.faqsdata =this.alldata.filter((element) => element.Type == type);
      }            
  }
}
