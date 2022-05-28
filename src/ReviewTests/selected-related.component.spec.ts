import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SelectRelatedComponent} from '../app/components/documents/select-related/select-related.component';

describe('SelectRelatedComponent', () => {
    let component: SelectRelatedComponent;
    let fixture: ComponentFixture<SelectRelatedComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SelectRelatedComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectRelatedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
