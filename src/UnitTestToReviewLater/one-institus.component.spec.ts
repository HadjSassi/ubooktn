import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OneInstitusComponent} from '../app/components/enivronnement-universitaire/one-institus/one-institus.component';

describe('OneInstitusComponent', () => {
    let component: OneInstitusComponent;
    let fixture: ComponentFixture<OneInstitusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OneInstitusComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OneInstitusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
