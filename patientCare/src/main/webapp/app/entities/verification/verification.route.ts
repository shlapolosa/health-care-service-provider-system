import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IVerification, Verification } from 'app/shared/model/verification.model';
import { VerificationService } from './verification.service';
import { VerificationComponent } from './verification.component';
import { VerificationDetailComponent } from './verification-detail.component';
import { VerificationUpdateComponent } from './verification-update.component';

@Injectable({ providedIn: 'root' })
export class VerificationResolve implements Resolve<IVerification> {
  constructor(private service: VerificationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IVerification> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((verification: HttpResponse<Verification>) => {
          if (verification.body) {
            return of(verification.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Verification());
  }
}

export const verificationRoute: Routes = [
  {
    path: '',
    component: VerificationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patientCareApp.verification.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: VerificationDetailComponent,
    resolve: {
      verification: VerificationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patientCareApp.verification.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: VerificationUpdateComponent,
    resolve: {
      verification: VerificationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patientCareApp.verification.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: VerificationUpdateComponent,
    resolve: {
      verification: VerificationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'patientCareApp.verification.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
