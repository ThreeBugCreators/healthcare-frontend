import { Component, OnInit } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Symptomps } from 'src/app/core/constants';
import { Observable, startWith, map, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { DoctorService } from 'src/app/core/services/doctor.service';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit {
  constructor(private doctorService: DoctorService) {
    this.cities = [
      {
        name: 'Đà Nẵng',
        code: 'Danang'
      },
    ];

    this.hospitals = {
      ['Danang']: [
        {
          name: 'Bệnh viện Hòa Khánh',
          code: 'BVHK',
        },
        {
          name: 'Bệnh viện Đa khoa Đà Nẵng',
          code: 'BVDK',
        },
        {
          name: 'Bệnh viện C Đà Nẵng',
          code: 'BVCDN',
        },
        {
          name: 'Bệnh viện Hoàn Mỹ',
          code: 'BVHM',
        },
        {
          name: 'Bệnh viện gia đình',
          code: 'BVGD',
        },
        {
          name: 'Bệnh viện Vinmec',
          code: 'BVMC',
        },
      ],
    }
  }

  filteredStreets!: Observable<string[]>;
  control = new FormControl('');
  
  cities!: City[];
  hospitals: any;
  selectedCity!: City;
  selectedHosptial: any;

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setUserPosition(position.coords.latitude, position.coords.longitude);
    });

    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  setUserPosition(x: any, y: any) {
    console.log({ x, y })
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.options.filter((option) =>
      this._normalizeValue(option).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  options = Symptomps;
  hashtags: string[] = [];
  chipInputKeyCodes = [ENTER, COMMA];
  maxDistance = 0;

  remove(hashtag: string): void {
    const index = this.hashtags.indexOf(hashtag);
    if (index >= 0) {
      this.hashtags.splice(index, 1);
    }
  }

  filterSymptoms(event: any) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.options.length; i++) {
      let country = this.options[i];
      console.log({
        country,
        query,
      })
      if (country.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredSymptoms = filtered;
  }

  filteredSymptoms: any;

  add(event: MatChipInputEvent): void {
    const chipInputCtrl = event.input;
    let value = event.value;
    if ((value || '').trim()) {
      value = value.trim();
      if (!this.options.includes(value)) return;
      this.hashtags.push(value.trim());
    }
    chipInputCtrl.value = '';
  }

  findDoctors() {
    if (this.hashtags.length) {
      this.doctorService.getDoctorsBySymptoms(this.hashtags).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {},
      });
    }
  }

  chooseSymptom(symptom: any) {
    if (this.options.includes(symptom)) {
      this.hashtags.push(symptom);
      this.control.setValue('');
    }
  }

  getListOfDoctors() {}
}
