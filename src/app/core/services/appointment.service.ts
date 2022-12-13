import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

enum AppointmentStatus {
    NotYet = 'not_yet',
    Done = 'done',
};

@Injectable({ providedIn: 'root' })
export class AppointmentService {
    private apiGatewayUrl = environment.apiGatewayUrl;
    
    constructor(
        private httpService: HttpService,
    ) {}

    submitAppointment({
        time,
        note,
        doctorId,
    }: {
        date: number,
        time: number,
        note: string,
        doctorId: any,
    }) {
        const momentDate = moment(time).utcOffset(0);

        return this.httpService.post({
            url: `${this.apiGatewayUrl}/api/v1/appointments`,
            data: {
                date: momentDate.toISOString(),
                note,
                doctor: doctorId,
            },
        });
    }

    getAppointments({
        appointmentStatus = AppointmentStatus.NotYet,
    }: {
        appointmentStatus?: AppointmentStatus,
    }) {
        return this.httpService.get({
            url: `${this.apiGatewayUrl}/api/v1/appointments`,
            queryParams: {
                status: appointmentStatus,
            }
        });
    }
}