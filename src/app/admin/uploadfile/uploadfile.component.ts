import { uploadFile } from './uploadfile.resolver';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadfileService } from './uploadfile.service';

@Component({
  selector: 'app-uploadfile',
  standalone: false,

  templateUrl: './uploadfile.component.html',
  styleUrl: './uploadfile.component.scss'
})
export class UploadFileComponent {

  user_id:string = '';
  selectedFiles: File[] =[]

  constructor(private sv:UploadfileService, private router:Router, private route:ActivatedRoute){}

  selectedFile!: FileList;
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files;
    }
  }

  upload(): void {
    this.route.data.subscribe(({uploadFile}) => {
      this.user_id = uploadFile;
    })

    if (this.selectedFile) {
      this.uploadFiles(this.selectedFile);
    }
  }

  uploadFiles(images: FileList): void {
    for (let index = 0; index < images.length; index++) {
      const element = images[index];

      const formData = new FormData();
      formData.append('file', element, element.name);
      formData.append('user_id',this.user_id);
      console.log(formData);


      this.sv.upload(formData).subscribe((res) => {
        console.log(res);
      });
    }
  }

}
