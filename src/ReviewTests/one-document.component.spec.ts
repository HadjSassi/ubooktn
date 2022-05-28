import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OneDocumentComponent} from '../app/components/documents/one-document/one-document.component';

describe('OneDocumentComponent', () => {
    let component: OneDocumentComponent;
    let fixture: ComponentFixture<OneDocumentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OneDocumentComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OneDocumentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
