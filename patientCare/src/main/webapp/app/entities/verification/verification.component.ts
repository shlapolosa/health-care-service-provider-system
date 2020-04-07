import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IVerification } from 'app/shared/model/verification.model';
import { VerificationService } from './verification.service';
import { VerificationDeleteDialogComponent } from './verification-delete-dialog.component';

@Component({
  selector: 'jhi-verification',
  templateUrl: './verification.component.html'
})
export class VerificationComponent implements OnInit, OnDestroy {
  verifications?: IVerification[];
  eventSubscriber?: Subscription;

  constructor(
    protected verificationService: VerificationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.verificationService.query().subscribe((res: HttpResponse<IVerification[]>) => (this.verifications = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInVerifications();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IVerification): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInVerifications(): void {
    this.eventSubscriber = this.eventManager.subscribe('verificationListModification', () => this.loadAll());
  }

  delete(verification: IVerification): void {
    const modalRef = this.modalService.open(VerificationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.verification = verification;
  }
}
