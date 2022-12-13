import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/core/services/appointment.service';
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
  createAppointmentSubscription!: Subscription;

  constructor(
    public messageService: MessageService,
    private activedRouted: ActivatedRoute,
    private doctorService: DoctorService,
    private appointmentService: AppointmentService,
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
      });
  }

  submitAppointment() {
    const submitData = {
      ...this.bookingForm.value,
      doctorId: this.doctorId,
    };

    this.createAppointmentSubscription = this.appointmentService
      .submitAppointment(submitData)
      .subscribe({
        next: (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Thank you for submitting the form',
          });
          this.createAppointmentSubscription.unsubscribe();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'Sorry, an error has ocurred',
          });
          this.createAppointmentSubscription.unsubscribe();
        },
      });
  }
}
