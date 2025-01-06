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

  userId:string = '';
  selectedFiles: File[] =[]
  uploading = false

  constructor(private sv:UploadfileService, private router:Router, private route:ActivatedRoute){}

  selectedFile!: FileList;
  onFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files;
    }
  }

  upload(): void {

    if (this.selectedFile) {
      this.uploadFiles(this.selectedFile);
    }
  }

  uploadFiles(file: FileList): void {
    const user_id = sessionStorage.getItem('user_id');
    this.userId = user_id || '';

    this.uploading = true;
    for (let index = 0; index < file.length; index++) {
      const element = file[index];

      const formData = new FormData();
      formData.append('file', element, element.name);
      formData.append('user_id',this.userId);
      console.log(formData);


      this.sv.upload(formData).subscribe((res) => {
        console.log(res);
        this.uploading = false;
      });

    }
  }

  // onDrop(event: DragEvent): void {
  //   event.preventDefault();
  //   if (event?.dataTransfer?.files) {
  //     this.uploadFiles(event.dataTransfer.files);
  //   }
  // }
  // onDragOver(event: DragEvent): void {
  //   event.preventDefault();
  // }

}
