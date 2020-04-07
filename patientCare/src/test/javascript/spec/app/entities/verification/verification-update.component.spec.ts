import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PatientCareTestModule } from '../../../test.module';
import { VerificationUpdateComponent } from 'app/entities/verification/verification-update.component';
import { VerificationService } from 'app/entities/verification/verification.service';
import { Verification } from 'app/shared/model/verification.model';

describe('Component Tests', () => {
  describe('Verification Management Update Component', () => {
    let comp: VerificationUpdateComponent;
    let fixture: ComponentFixture<VerificationUpdateComponent>;
    let service: VerificationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PatientCareTestModule],
        declarations: [VerificationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(VerificationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(VerificationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(VerificationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Verification(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Verification();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
