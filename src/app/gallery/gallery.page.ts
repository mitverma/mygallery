import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  folderName: any;
  inputFolderName: boolean = false;
  galleryData = [];
  constructor(private firestore: AngularFirestore, private navCtrl: NavController) { }

  ngOnInit() {
    this.firestore.collection('gallery').get().subscribe(data => {
      if(data){
        this.galleryData = data.docs.map(list => {
          let value = {};
          value = list.data();
          value['id'] = list.id;
          return value;
        });
        console.log(this.galleryData, 'get users');
      }
    });
  }


  createFolder(){
    this.inputFolderName = true;
  }

  close(){
    this.inputFolderName = false;
    this.folderName = '';
  }

  create(){
    let value = {
      folderName: this.folderName,
      imageList: []
    }
    if(this.galleryData && this.galleryData.length) {
      this.firestore.collection('gallery').add(value).then(res => {
        console.log(res, 'response');
        value['id'] = res.id;
        this.galleryData.push(value);
      });
    }else {
      this.firestore.collection('gallery').add({
        folderName: this.folderName,
        imageList: []
      });
    }
    this.inputFolderName = false;
    this.folderName = "";
  }


  viewFolder(folderData){
    let navigationExtras: NavigationExtras = {
      queryParams: folderData
  };
    this.navCtrl.navigateForward('/gallery-list', navigationExtras);
  }

  
}
