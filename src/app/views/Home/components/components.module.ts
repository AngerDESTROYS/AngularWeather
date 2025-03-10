import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WeatherCardComponent } from "./weather-card/weather-card.component";
import { CommonModule } from "@angular/common";
import { WeeklyWeatherComponent } from "./weekly-weather/weekly-weather.component";
import {MatExpansionModule} from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [WeatherCardComponent, WeeklyWeatherComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatButtonModule,
  ],
  exports: [WeatherCardComponent, WeeklyWeatherComponent],
})
export class HomeComponentsModule {}
