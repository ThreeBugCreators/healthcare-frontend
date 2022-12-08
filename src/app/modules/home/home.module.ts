import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { DoctorAdviseComponent } from './pages/doctor-advise/doctor-advise.component';
import { BlogPageComponent } from './pages/blog-page/blog-page.component';
import { SurveyPageComponent } from './pages/survey-page/survey-page.component';
import { HomeRoutingModule } from './home.routing';
import { MatChipsModule } from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { DoctorListComponent } from './pages/doctor-list/doctor-list.component';
import { OrderListModule } from 'primeng/orderlist';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { DropdownModule } from 'primeng/dropdown';
import { ChipsModule } from 'primeng/chips';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RatingModule } from 'primeng/rating';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { BookingPageComponent } from './pages/booking-page/booking-page.component';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  declarations: [
    SearchPageComponent,
    ProfilePageComponent,
    DoctorAdviseComponent,
    BlogPageComponent,
    SurveyPageComponent,
    DoctorListComponent,
    BookingPageComponent,
    // For hashtag input
  ],
  imports: [
    SharedModule,
    RouterModule,
    HomeRoutingModule,
    MatIconModule,
    MatChipsModule,
    OrderListModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    DropdownModule,
    ChipsModule,
    AutoCompleteModule,
    RatingModule,
    InputTextareaModule,
    CalendarModule,
  ],
  exports: [],
  providers: [],
})
export class HomeModule {}
