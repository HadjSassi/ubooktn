import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AllProfilsComponent} from '../app/components/profils/all-profils/all-profils.component';

describe('AllProfilsComponent', () => {
    let component: AllProfilsComponent;
    let fixture: ComponentFixture<AllProfilsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AllProfilsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AllProfilsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
