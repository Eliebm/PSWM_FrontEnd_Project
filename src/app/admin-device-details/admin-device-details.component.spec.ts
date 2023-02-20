import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeviceDetailsComponent } from './admin-device-details.component';

describe('AdminDeviceDetailsComponent', () => {
  let component: AdminDeviceDetailsComponent;
  let fixture: ComponentFixture<AdminDeviceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDeviceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDeviceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
