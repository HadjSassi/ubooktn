import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmationComponent} from '../app/components/not-found/confirmation/confirmation.component';

describe('ConfirmationComponent', () => {
    let component: ConfirmationComponent;
    let fixture: ComponentFixture<ConfirmationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConfirmationComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
