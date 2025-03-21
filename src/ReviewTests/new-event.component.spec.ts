import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewEventComponent} from '../app/components/events/new-event/new-event.component';

describe('NewEventComponent', () => {
    let component: NewEventComponent;
    let fixture: ComponentFixture<NewEventComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NewEventComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
