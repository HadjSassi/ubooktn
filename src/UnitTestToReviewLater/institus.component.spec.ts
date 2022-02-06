import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InstitusComponent} from '../app/components/enivronnement-universitaire/institus/institus.component';

describe('InstitusComponent', () => {
    let component: InstitusComponent;
    let fixture: ComponentFixture<InstitusComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InstitusComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InstitusComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
