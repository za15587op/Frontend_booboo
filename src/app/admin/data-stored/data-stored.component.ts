import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataStoredService } from './data-stored.service';

@Component({
  selector: 'app-data-stored',
  standalone: false,

  templateUrl: './data-stored.component.html',
  styleUrl: './data-stored.component.scss'
})
export class DataStoredComponent implements OnInit {
  dropdownOpen: { [key: string]: boolean } = {}
  data :any;
  constructor(private route : ActivatedRoute, private datasv :DataStoredService ,private http : HttpClient){}

  ngOnInit(): void {
    this.getdata();
  }

  downloadFile(fileData: string, fileName: string): void {
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${fileData}`;
    link.download = fileName;
    link.click();
  }
  deleteFile(fileId: string): void {
    console.log(`File ID to delete: ${fileId}`); // Log fileId
    if (confirm('คุณแน่ใจว่าต้องการลบไฟล์นี้?')) {
      this.datasv.deldataflie(fileId).subscribe({
        next: () => {
          alert('ลบไฟล์สำเร็จ');
          window.location.reload(); // รีเฟรชหน้าเว็บหลังจากลบสำเร็จ
        },
        error: (err) => {
          console.error('Error deleting file:', err);
          alert('เกิดข้อผิดพลาดในการลบไฟล์');
        }
      });
    }
  }
  getdata() :void {
    this.route.data.subscribe(({getDataFileResolve}) =>{
      this.data = getDataFileResolve
      console.log(this.data)
    })
  }

  toggleDropdown(fileId: string): void {
    // รีเซ็ต dropdown ทั้งหมดก่อนเปิด dropdown ที่ต้องการ
    this.dropdownOpen = {};
    this.dropdownOpen[fileId] = true;
  }
  @HostListener('document:click', ['$event'])
  closeDropdown(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = {}; // ปิด dropdown ทั้งหมด
    }
  }
}
