import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormationsComponent} from '../app/components/events/formations/formations.component';

describe('FormationsComponent', () => {
    let component: FormationsComponent;
    let fixture: ComponentFixture<FormationsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FormationsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FormationsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
