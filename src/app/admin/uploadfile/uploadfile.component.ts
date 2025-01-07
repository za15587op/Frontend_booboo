import { Component } from '@angular/core';
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

  constructor(private sv:UploadfileService){}

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
}
