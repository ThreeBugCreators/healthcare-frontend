import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AppointmentService } from 'src/app/core/services/appointment.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
  providers: [ ConfirmationService ],
})
export class BookingListComponent implements OnInit {
  getAppointmentSubscription!: Subscription;
  appointments: any;

  constructor(
    public messageService: MessageService,
    private appointmentService: AppointmentService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.getAppointmentSubscription = this.appointmentService
      .getAppointments({})
      .subscribe({
        next: (data: any) => {
          const { data: appointments } = data;
          this.appointments = appointments;
          console.log(this.appointments);
          this.getAppointmentSubscription.unsubscribe();
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'error',
            detail: 'cannot get appointments',
          });
          this.getAppointmentSubscription.unsubscribe();
        }
      })
  }

  confirm() {
    this.confirmationService.confirm({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
        },
        reject: (type: any) => {
            switch(type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
                break;
                case ConfirmEventType.CANCEL:
                    this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
                break;
            }
        }
    });
}
}
