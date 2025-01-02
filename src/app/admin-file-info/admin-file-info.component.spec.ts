import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFileINFOComponent } from './admin-file-info.component';

describe('AdminFileINFOComponent', () => {
  let component: AdminFileINFOComponent;
  let fixture: ComponentFixture<AdminFileINFOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminFileINFOComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFileINFOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
