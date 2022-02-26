import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditEventComponent} from '../app/components/events/edit-event/edit-event.component';

describe('EditEventComponent', () => {
    let component: EditEventComponent;
    let fixture: ComponentFixture<EditEventComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditEventComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
