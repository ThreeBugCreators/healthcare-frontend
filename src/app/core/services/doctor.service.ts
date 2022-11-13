import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class DoctorService {
    apiGatewayUrl = environment.apiGatewayUrl;
    
    constructor(
        private httpService: HttpService,
    ) {}

    async getDoctors() {
        const getDoctorsUrl = `${this.apiGatewayUrl}/api/v1/doctors`;
        const getDoctorsRequestData = await this.httpService.get({ url: getDoctorsUrl }); 
    }
}