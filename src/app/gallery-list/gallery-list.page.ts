import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { ImageViewerPage } from '../image-viewer/image-viewer.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.page.html',
  styleUrls: ['./gallery-list.page.scss'],
})
export class GalleryListPage implements OnInit {
  getAllFolderDetail: any;
  fileData = {
    image: null,
    date: '',
    fileName: ''
  };
  cameraOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  constructor(private activateRoute: ActivatedRoute, private actionSheetController: ActionSheetController, private toastController: ToastController, private fireStore: AngularFirestore, public modalController: ModalController,  private camera: Camera) {
    this.getAllFolderDetail = this.activateRoute.snapshot.queryParams;
    console.log(this.getAllFolderDetail,  'get detail');
  }

  ngOnInit() {
  }

  async openActionSheet() {
    let inputNode = document.createElement("input");
    inputNode.setAttribute("type", "file");
    inputNode.setAttribute("accept", "image/png, image/jpg");
    inputNode.setAttribute("style", "position: relative; z-index: 99999; width: 100%; height: 100%; opacity: 0; top: -50px");
    inputNode.addEventListener("change", (event) => { this.profilePicUpload(event) });
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload File',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Camera',
        role: 'destructive',
        icon: 'camera-reverse-outline',
        handler: () => {
          this.openCamera();
        }
      }, {
        text: 'Gallery',
        icon: 'image-outline',
        handler: () => {
          // this.openGallery();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present().then(() => {
      actionSheet.querySelectorAll("button")[1].appendChild(inputNode);
    });

    await actionSheet.onDidDismiss().then(() => {
      inputNode.removeEventListener("change", (event) => { this.profilePicUpload(event) });
    });
    // console.log('onDidDismiss resolved with role', role);
  }


  
  openShare(){
    let string = '';
    // if(this.getPatientAllDetails.visitDetails){
    //   this.getPatientAllDetails.visitDetails.forEach(element => {
    //     if(element){
    //       string += element.visitDate + "\n" + element.medicinePrescription + "\n";
    //     }
    //   });
    // }

    console.log(string, 'string');
    // this.socialSharing.share(string, 'subject', '', '').then((response) => {
    //   console.log(response, 'response');
    // })
  }

  profilePicUpload(event){
    console.log(event);
    const file = event.target.files[0];
    console.log(file, 'foile');
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result, 'base64');
        if(file.size < 1000000){
          this.fileData.image = reader.result;
          this.fileData.date = file.lastModifiedDate;
          this.fileData.fileName = file.name;
        }else {
          this.toastMessage('File Size is more than 1MB');
        }
        // this.base64ToBlob(reader.result);

    };
  }

  upload(){
    let updateData = {
      folderName: this.getAllFolderDetail.folderName,
      imageList: this.getAllFolderDetail.imageList || []
    };
    if(this.getAllFolderDetail && this.getAllFolderDetail.imageList && this.getAllFolderDetail.imageList.length){
      this.getAllFolderDetail.imageList.push(this.fileData);
    }else {
      updateData.imageList.push(this.fileData);

    }
    if(this.getAllFolderDetail.id) {
      this.fireStore.doc('gallery/'+this.getAllFolderDetail.id).update(updateData).then(response => {
        this.toastMessage('data upload successfully');
        this.fileData = {
          image: null,
          date: null,
          fileName: null
        };
      }, error => {
        console.log(error, 'error');
      })
    }
  }


  async toastMessage(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }


  async viewImage(listData) {
    const modal = await this.modalController.create({
      component: ImageViewerPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'image': listData.image
      }
    });
    return await modal.present();
  }

  openCamera(){
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.fileData.image= base64Image;;
      this.fileData.date = '';
      this.fileData.fileName = 'Shree_gallery'

     }, (err) => {
      // Handle error
     });
  }
}
