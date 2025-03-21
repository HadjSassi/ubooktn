import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocumentsComponent} from '../app/components/documents/documents.component';

describe('DocumentsComponent', () => {
    let component: DocumentsComponent;
    let fixture: ComponentFixture<DocumentsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DocumentsComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DocumentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
