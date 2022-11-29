import { Component, OnInit } from '@angular/core';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { IProperty } from 'src/app/interfaces/property.interface';
import { PropertiesService } from 'src/app/services/properties.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  previewImageProgress: number = 0;
  isUploadingPreview: boolean = false;
  imagesProgress: number = 0;
  isUploadingImages: boolean = false;
  imagesRemaining: number = 0;
  isUploadingModel: boolean = false;
  modelProgress: number = 0;
  title: string = '';
  description: string = '';
  seller_id: string = '';
  newProperty: Partial<IProperty> = {
    title: '',
    description: '',
    imageUrls: [],
    previewImageUrl: '',
    model: '',
    seller_id: '',
  };
  constructor(
    private propertiesService: PropertiesService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(({ _id }) => {
      this.newProperty.seller_id = _id;
    });
  }

  onUploadPreviewImage({ files }: any) {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, files[0]);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        this.isUploadingPreview = true;
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.previewImageProgress = progress;
      },
      (error) => {
        alert(error);
      },
      () => {
        this.isUploadingPreview = false;
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.newProperty.previewImageUrl = downloadURL;
        });
      }
    );
  }

  onUploadImages({ files }: any) {
    console.log(files);
    const storage = getStorage();
    files.forEach((image: any) => {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          this.isUploadingImages = true;
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.imagesProgress = progress;
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            this.newProperty.imageUrls?.push(downloadURL);
            this.isUploadingImages = false;
          });
        }
      );
    });
  }

  onUploadModel({ files }: any) {
    const storage = getStorage();
    const storageRef = ref(storage, `models/${files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, files[0]);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        this.isUploadingModel = true;
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.modelProgress = progress;
      },
      (error) => {
        alert(error);
      },
      () => {
        this.isUploadingModel = false;
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.newProperty.model = downloadURL;
        });
      }
    );
  }

  onSubmit() {
    this.newProperty.description = this.description;
    this.newProperty.title = this.title;
    this.propertiesService.saveNewProperty(this.newProperty).then(() => {
      this.toastr.error('Property Saved', 'Notification');
    });
  }
}
