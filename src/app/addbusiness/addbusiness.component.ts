import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastData, ToastOptions, ToastyService } from 'ng2-toasty';
import * as firebase from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';
import { ApisService } from '../services/apis.service';
@Component({
  selector: 'addbusiness',
  templateUrl: './addbusiness.component.html',
  styleUrls: ['./addbusiness.component.css']
})
export class AddbusinessComponent implements OnInit {
  new: boolean;
  email: any = '';
  fullname: any = '';
  password: any = '';
  phone: any = '';
  banner_to_upload: any = '';
  coverImage: any = '';
  id: any;
  constructor(
    private route: ActivatedRoute,
    private api: ApisService,
    private toastyService: ToastyService,
    private spinner: NgxSpinnerService,
    private navCtrl: Location,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(data => {
      this.new = data.register === 'true' ? true : false;
      if (!this.new && data.id) {
        this.spinner.show();
        this.id = data.id;
        this.api.getProfile(data.id).then(data => {
          this.spinner.hide();
          this.coverImage = data.coverImage;
          this.fullname = data.fullname;
          this.email = data.email;
          this.phone = data.phone;
        }).catch(error => {
          this.spinner.hide();
          console.log(error);
        });
      }
    });
  }

  error(message) {
    const toastOptions: ToastOptions = {
      title: this.api.translate('Error'),
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    this.toastyService.error(toastOptions);
  }
  success(message) {
    const toastOptions: ToastOptions = {
      title: this.api.translate('Success'),
      msg: message,
      showClose: true,
      timeout: 2000,
      theme: 'default',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function (toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
    // Add see all possible types in one shot
    this.toastyService.success(toastOptions);
  }

  preview_banner(files) {

    console.log('fle', files);
    this.banner_to_upload = [];
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    this.banner_to_upload = files;
    if (this.banner_to_upload) {
      this.spinner.show();
      console.log('ok');
      const file1 = files[0];
      const storageRef = firebase.storage().ref('drivers' + '/' + file1.name);
      const task = storageRef.put(file1);
      task.on('state_changed',
        (snapshot: any) => {
        },
        (error) => {
          this.spinner.hide();
          this.error(this.api.translate('Something went wrong'));
          // this.api.alerts('Error', 'Something went wrong', 'error');
          console.error(error);
        },
        () => {
          storageRef.getDownloadURL().then((downloadURL) => {
            console.log('download ur', downloadURL);
            this.coverImage = downloadURL;
            this.spinner.hide();
          },
            (error) => {
              this.spinner.hide();
              this.error(this.api.translate('Something went wrong'));
              console.error('upload rejected', error);
            });
        }
      );

    } else {
      console.log('no');
    }
  }

  create() {
    this.api.alerts('Success', 'New Business Created', 'success');
    this.navCtrl.back();
  }
  update() {
    this.api.alerts('Success', 'Business Updated', 'success');
    this.navCtrl.back();
  }
}
