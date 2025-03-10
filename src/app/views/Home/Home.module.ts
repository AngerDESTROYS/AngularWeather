import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from '../../shared/components/components.module';
import { HomeComponentsModule } from './components/components.module';
import { HomeComponent } from './Page/home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeComponentsModule,
    SharedComponentsModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {}
