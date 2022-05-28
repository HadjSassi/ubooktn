import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OneClubComponent} from '../app/components/enivronnement-universitaire/one-club/one-club.component';

describe('OneClubComponent', () => {
    let component: OneClubComponent;
    let fixture: ComponentFixture<OneClubComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OneClubComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OneClubComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
