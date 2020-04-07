import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'verification',
        loadChildren: () => import('./verification/verification.module').then(m => m.PatientCareVerificationModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class PatientCareEntityModule {}
