
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
export class AuthInfo {
  constructor(public $uid: string) { }

  isLoggedIn() {
    return !!this.$uid;
  }
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = 'https://api.entrypass.biz/api';
// const apiUrl = 'https://localhost:44353/api';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  static UNKNOWN_USER = new AuthInfo(null);
  forgotemail="";
  prepaid:any;
  public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(ApisService.UNKNOWN_USER);
  constructor(
    private http: HttpClient,
    private translateService: TranslateService
  ) { }
  public getAdmin(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const url = `${apiUrl}/user/admin`;
        this.http.get(url).subscribe(async (review) => {
        let data = review['result'].data.map((element) => {
          return review['result'];
        });
        resolve(data);
      }, error => {
        reject(error);
      });
    });
  }  
  public checkAuth(type) {
    return new Promise((resolve, reject) => {
        var userdata = localStorage.getItem('Users');
         var user=JSON.parse(userdata);
       if (user) {      
          if(user && user.Role==type){
            const url = `${apiUrl}/subscriptionpayment/check/`+user.Id;  
            this.http.get(url).subscribe(async (review) => {              
              var data={
                user:user,
                checkstatus:review['result']
              }
              resolve(data);
            }, error => {
              reject(error);
            });
          }       
      } else {
        localStorage.clear();
        resolve(false);
      }
    });
  }
  login(formdata){
    const url = `${apiUrl}/user/adminlogin`;     
    return this.http.post(url, formdata);
  } 
  EmailCheck(formdata){
    const url = `${apiUrl}/user/emailcheck`;     
    return this.http.post(url, formdata);
  } 
  ChangePass(formdata){
    const url = `${apiUrl}/user/changepass`;     
    return this.http.post(url, formdata);
  } 
  adminsignup(formdata){
    const url = `${apiUrl}/user/adminadd`;     
    return this.http.post(url, formdata);
  }
  checkpayment(id){
    const url = `${apiUrl}/subscriptionpayment/check/`;     
    return this.http.get(url+id);
  }
  Payment(formdata){
    const url = `${apiUrl}/subscriptionpayment/pay`;     
    return this.http.post(url, formdata);
  }
  getpaymentData(){
    const url = `${apiUrl}/subscriptionpayment/list`;     
    return this.http.get(url);
  }
  
  signup(formdata){
    const url = `${apiUrl}/business/websignup`;     
    return  this.http.post(url, formdata);
  }
  

  public getphonelist(){
    return this.http.get("https://restcountries.eu/rest/v2/all")
  }
  public getfaqsalllist(){
    const url = `${apiUrl}/faqs/alllist`;     
    return this.http.get(url);
  }
  public getfaqslist(){
    const url = `${apiUrl}/faqs/list`;     
    return this.http.get(url);
  }
  public faq_remove(id){
    const url = `${apiUrl}/faqs/delete/`;     
    return this.http.get(url+id);
  }
  public getfaq(id){
    const url = `${apiUrl}/faqs/`;     
    return this.http.get(url+id);
  }
  
  public addfaqs(Question,Answer,Type,Status){
    const url = `${apiUrl}/faqs/add`; 
    const form = {
     
          "Question": Question,
          "Answer": Answer,
          "Type": Type,
          "Status": Status
        }   
    return this.http.post(url, form);
  }
  public updatefaqs(id: any, Question: any, Answer: any,Type: any,Status: number){
    const url = `${apiUrl}/faqs/update`; 
    const form = {
          "Id": id,
          "Question": Question,
          "Answer": Answer,
          "Type": Type,
          "Status": Status
        }   
    return this.http.post(url, form);
  }
  public getsubscriptionsalllist(){
    const url = `${apiUrl}/subscriptions/alllist`;     
    return this.http.get(url);
  }
  public getsubscriptionslist(){
    const url = `${apiUrl}/subscriptions/list`;     
    return this.http.get(url);
  }
  public subscription_remove(id){
    const url = `${apiUrl}/subscriptions/delete/`;     
    return this.http.get(url+id);
  }
  public getsubscription(id){
    const url = `${apiUrl}/subscriptions/`;     
    return this.http.get(url+id);
  }
  /* Start User registrations */
  public getuserlist(){
    const url = `${apiUrl}/appuser/list`;     
    return this.http.get(url);
  }
  public GetUserHistoryList(id){
    const url = `${apiUrl}/appuserhistory/`;     
    return this.http.get(url+id);
  }
  public getUser(id){
    const url = `${apiUrl}/appuser/`;     
    return this.http.get(url+id);
  }
  public UpdateAppUser(formdata){
    const url = `${apiUrl}/appuser/update`;     
    return this.http.post(url,formdata);
  }
  /* End User registrations */
  /* Start Business */
  public GetBusinessHistoryList(id){
    const url = `${apiUrl}/businesshistory/`;     
    return this.http.get(url+id);
  }
 
  public BusinessList(){
    const url = `${apiUrl}/business/list`;     
    return this.http.get(url);
  }
  public getBusiness(id){
    const url = `${apiUrl}/business/`;     
    return this.http.get(url+id);
  }
  public AddBusiness(formdata){
    const url = `${apiUrl}/business/add`;     
    return this.http.post(url,formdata);
  }
  public UpdateBusiness(formdata){
    const url = `${apiUrl}/business/update`;     
    return this.http.post(url,formdata);
  }
  /* End Business */

  /* Start Health */
  public HealthList(){
    const url = `${apiUrl}/health/list`;     
    return this.http.get(url);
  }
  public getHealth(id){
    const url = `${apiUrl}/health/`;     
    return this.http.get(url+id);
  }
  public AddHealth(formdata){
    const url = `${apiUrl}/health/add`;     
    return this.http.post(url,formdata);
  }
  public UpdateHealth(formdata){
    const url = `${apiUrl}/health/update`;     
    return this.http.post(url,formdata);
  }
  public GetHealthHistoryList(id){
    const url = `${apiUrl}/healthhistory/`;     
    return this.http.get(url+id);
  }
  /* End Health */

  /* Start Location */
  public GetLocationList(id){
    const url = `${apiUrl}/location/list/`;     
    return this.http.get(url+id);
  }
  public GetLocation(id){
    const url = `${apiUrl}/location/`;     
    return this.http.get(url+id);
  }
  public AddLocation(formdata){
    const url = `${apiUrl}/location/add`;     
    return this.http.post(url,formdata);
  }
  public UpdateLocation(formdata){
    const url = `${apiUrl}/location/update`;     
    return this.http.post(url,formdata);
  }
  public DeleteSubLocation(id){
    const url = `${apiUrl}/location/subdelete/`;     
    return this.http.get(url+id);
  }
  public DeleteLocation(id){
    const url = `${apiUrl}/location/delete/`;     
    return this.http.get(url+id);
  }
   /* End Location */

   /* Start Term and condiction */
  public getConfig(){
    const url = `${apiUrl}/config/list`;     
    return this.http.get(url);
  }
  public ConfigAdd(formdata){
    const url = `${apiUrl}/config/add`;     
    return this.http.post(url,formdata);
  }
  public GetBusinessTransaction(id){
    const url = `${apiUrl}/qrcode/business/`;     
    return this.http.get(url+id);
  }
  public GetHealthTransaction(id){
    const url = `${apiUrl}/qrcode/health/`;     
    return this.http.get(url+id);
  }
  
   /* End Term and condiction */

  public addsubscription(Name,Amount,Description,Status){
    const url = `${apiUrl}/subscriptions/add`; 
    const form = {
        "Name": Name,
        "Amount": Amount,
        "Description": Description,
        "Status": Status
        }   
    return this.http.post(url, form);
  }
  public updatesubscription(id: any, Name: any, Amount: any,Description: any,Status: number){
    const url = `${apiUrl}/subscriptions/update`; 
    const form = {
          "Id": id,
          "Name": Name,
          "Amount": Amount,
          "Description": Description,
          "Status": Status
        }   
    return this.http.post(url, form);
  }
  public SubmitContact(formdata){
    const url = `${apiUrl}/contact/send`;     
    return this.http.post(url,formdata);
  }
  translate(str) {
    const currentLang = this.translateService.currentLang;
    const returnValue = this.translateService.translations[currentLang][str];
    if (returnValue === undefined) {
      return this.translateService.translations.en_merch[str];
    } else {
      return returnValue;
    }
  }
  alerts(title, message, type) {
    Swal.fire(
      title,
      message,
      type
    );
  }

}
