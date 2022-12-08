import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorAdviseComponent } from './doctor-advise.component';

describe('DoctorAdviseComponent', () => {
  let component: DoctorAdviseComponent;
  let fixture: ComponentFixture<DoctorAdviseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorAdviseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorAdviseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
