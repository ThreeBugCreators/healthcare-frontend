import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class DoctorService {
    private apiGatewayUrl = environment.apiGatewayUrl;
    
    constructor(
        private httpService: HttpService,
    ) {}

    getDoctors() {
        const getDoctorsUrl = `${this.apiGatewayUrl}/api/v1/doctors`;
        return this.httpService.get({ url: getDoctorsUrl })
            .pipe(map(
                response => {
                    const dataResponse = response as any;
                    return dataResponse && dataResponse.data;
                }
            ));
    }

    getDoctorsBySymptoms(symptoms: Array<string>) {
        const getDoctorsUrl = `${this.apiGatewayUrl}/api/v1/doctors`;
        return this.httpService.get({ url: getDoctorsUrl, queryParams: { symptoms } })
            .pipe(map(
                response => {
                    const dataResponse = response as any;
                    return dataResponse && dataResponse.data;
                }
            ));
    }

    getDoctor(doctorId: string) {
        const getDoctorsUrl = `${this.apiGatewayUrl}/api/v1/doctors/${doctorId}`;
        return this.httpService.get({ url: getDoctorsUrl })
            .pipe(map(
                response => {
                    const dataResponse = response as any;
                    return dataResponse && dataResponse.data;
                }
            ));
    }
}