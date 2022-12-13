import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

import { SurveySerivce } from 'src/app/core/services/survey.service';

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss'],
})
export class SurveyPageComponent implements OnInit {

  constructor(
    public messageService: MessageService,
    private surveyService: SurveySerivce,
  ) { }

  surveyData!: FormGroup;
  serviceRating: number = 0;
  ratingDescription: string = '';
  surveySubmitSubscription!: Subscription;

  ngOnInit(): void {
    this.surveyData = new FormGroup({
      serviceRating: new FormControl(0),
      infraRating: new FormControl(0),
      doctorRating: new FormControl(''),
      thoughts: new FormControl(''),
    });
  }

  async submitSurvey(): Promise<void> {
    const handleSurveySubmitSuccess: (data: any) => void = (data) => {
      this.messageService.add({
        summary: 'summary',
        detail: 'detail',
        severity:'success',
      });
    };

    const handleSurveySubmitError: (err: any) => void = (err: any) => {
      this.messageService.add({
        summary: 'summary',
        detail: 'detail',
        severity: 'error',
      })
    };
    
    this.surveySubmitSubscription = this.surveyService.submitSurvey(this.surveyData.value)
      .subscribe({
        next: (data) => {
          handleSurveySubmitSuccess(data);
          this.surveySubmitSubscription.unsubscribe();
        },
        error: (err) => {
          handleSurveySubmitError(err);
          this.surveySubmitSubscription.unsubscribe();
        },
        complete: () => {
          this.surveySubmitSubscription.unsubscribe();
        },
      });
  }
}
