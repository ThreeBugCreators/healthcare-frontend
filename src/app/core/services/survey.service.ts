import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class SurveySerivce {
    private apiGatewayUrl = environment.apiGatewayUrl;
    
    constructor(
        private httpService: HttpService,
    ) {}

    submitSurvey({
        infraRating,
        serviceRating,
        doctorRating,
        thoughts,
    }: {
        infraRating: number,
        serviceRating: number,
        doctorRating: number,
        thoughts: string,
    }) {
        return this.httpService.post({
            url: `${this.apiGatewayUrl}/api/v1/surveys`,
            data: {
                infraRating,
                serviceRating,
                doctorRating,
                thoughts,
            },
        });
    }
}