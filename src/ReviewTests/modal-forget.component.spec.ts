import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalForgetComponent} from '../app/components/auth/modal-forget/modal-forget.component';

describe('ModalForgetComponent', () => {
    let component: ModalForgetComponent;
    let fixture: ComponentFixture<ModalForgetComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ModalForgetComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalForgetComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
