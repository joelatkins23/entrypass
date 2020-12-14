import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApisService } from '../services/apis.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: [
    './faqs.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class FaqsComponent implements OnInit {
 
  selected_type="all";
  faqsdata: any[] = [];
  alldata:any[] = []; 
  constructor(
    private api: ApisService,
    private router: Router
  ) {  
    this.getfaqslist();
  }

  ngOnInit() {    
  }
  getfaqslist() {
    this.api.getfaqsalllist().subscribe(resp => {
          this.faqsdata=resp['data'];
          this.alldata=resp['data'];
      }, err => {
          console.log(err);
      });
  }
  type_change(type){
      this.selected_type=type;
      if(type=='all'){
          this.faqsdata=this.alldata;
      }else{
          this.faqsdata =this.alldata.filter((element) => element.Type == type);
      }            
  }
  faq_remove(id){
    this.api.faq_remove(id).subscribe(resp => {
      this.faqsdata=resp['data'];
      this.alldata=resp['data'];
  }, err => {
      console.log(err);
  });
  }
  createfaq(){
    const navData: NavigationExtras = {
      queryParams: {
        register: true
      }
    };
    this.router.navigate(['addfaq'], navData);
  }
  editfaq(id){  
        const navData: NavigationExtras = {
          queryParams: {
            id: id,
            register: false
          }
        };
        this.router.navigate(['addfaq'], navData);
  }
  
}
