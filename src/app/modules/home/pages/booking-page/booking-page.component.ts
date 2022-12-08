import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { DoctorService } from 'src/app/core/services/doctor.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.component.html',
  styleUrls: ['./booking-page.component.scss']
})
export class BookingPageComponent implements OnInit {

  doctorId: string = '';
  doctor: any;
  bookingForm!: FormGroup;

  constructor(
    private activedRouted: ActivatedRoute,
    private doctorService: DoctorService,
  ) { }

  ngOnInit(): void {
    const { queryParams } = this.activedRouted.snapshot;
    this.doctorId = queryParams && queryParams['doctorId'];
    this.buildBookingForm();
    this.getDoctor();
  }

  buildBookingForm() {
    this.bookingForm = new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      time: new FormControl('', [Validators.required]),
      note: new FormControl(''),
    });
  }

  getDoctor() {
    this.doctorService.getDoctor(this.doctorId)
      .subscribe((data) => {
        this.doctor = data['doctor'];
        console.log(this.doctor);
      })
  }

}
