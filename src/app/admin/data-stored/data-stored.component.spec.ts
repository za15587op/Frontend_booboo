import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataStoredComponent } from './data-stored.component';

describe('DataStoredComponent', () => {
  let component: DataStoredComponent;
  let fixture: ComponentFixture<DataStoredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataStoredComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataStoredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
