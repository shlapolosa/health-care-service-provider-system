import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IVerification } from 'app/shared/model/verification.model';
import { VerificationService } from './verification.service';

@Component({
  templateUrl: './verification-delete-dialog.component.html'
})
export class VerificationDeleteDialogComponent {
  verification?: IVerification;

  constructor(
    protected verificationService: VerificationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.verificationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('verificationListModification');
      this.activeModal.close();
    });
  }
}
