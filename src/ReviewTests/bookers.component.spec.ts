import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookersComponent} from '../app/components/events/bookers/bookers.component';

describe('BookersComponent', () => {
    let component: BookersComponent;
    let fixture: ComponentFixture<BookersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BookersComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(BookersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
