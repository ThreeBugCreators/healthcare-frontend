import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/core/services/chat.service';
import { DoctorService } from 'src/app/core/services/doctor.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss'],
})
export class DoctorListComponent implements OnInit {
  displayDoctorModal: boolean = false;
  currentDoctor: any;
  doctors: any;

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private chatService: ChatService,
  ) {}

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.doctorService.getDoctors()
      .subscribe((requestData) => {
        this.doctors = requestData;
        this.currentDoctor = this.doctors[0];
      });
  }

  showDoctorModal(i: Number) {
    if (this.displayDoctorModal) {
      return;
    }
    this.currentDoctor = this.doctors[String(i)];
    this.displayDoctorModal = true;
  }

  chatWithDoctor() {
    this.chatService.createChatRoom({
      doctorId: this.currentDoctor.doctorId,
    })
      .subscribe((roomData) => {
        this.router.navigate(['/app/advise']);
      });
  }

  createAppointment() {

    console.log(this.currentDoctor);

    this.router.navigate(['/app/booking'], {
      queryParams: {
        doctorId: this.currentDoctor.doctorId,
      }
    });
  }

  addDoctorToFavour() {

  }
}
