import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientCareSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [PatientCareSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent]
})
export class PatientCareHomeModule {}
