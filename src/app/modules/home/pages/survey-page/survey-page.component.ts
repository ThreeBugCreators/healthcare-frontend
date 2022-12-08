import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss']
})
export class SurveyPageComponent implements OnInit {

  constructor() { }

  surveyData!: FormGroup;
  serviceRating: number = 0;
  ratingDescription: string = '';

  ngOnInit(): void {
    this.surveyData = new FormGroup({
      rating: new FormControl(0),
      surveyDetail: new FormControl(''),
    });
  }

}
