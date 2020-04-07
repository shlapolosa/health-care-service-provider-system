import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientCareSharedModule } from 'app/shared/shared.module';
import { VerificationComponent } from './verification.component';
import { VerificationDetailComponent } from './verification-detail.component';
import { VerificationUpdateComponent } from './verification-update.component';
import { VerificationDeleteDialogComponent } from './verification-delete-dialog.component';
import { verificationRoute } from './verification.route';

@NgModule({
  imports: [PatientCareSharedModule, RouterModule.forChild(verificationRoute)],
  declarations: [VerificationComponent, VerificationDetailComponent, VerificationUpdateComponent, VerificationDeleteDialogComponent],
  entryComponents: [VerificationDeleteDialogComponent]
})
export class PatientCareVerificationModule {}
