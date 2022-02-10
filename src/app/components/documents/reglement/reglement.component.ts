import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-reglement',
    templateUrl: './reglement.component.html',
    styleUrls: ['./reglement.component.css']
})
export class ReglementComponent implements OnInit {

    constructor(private route: Router) {
    }

    ngOnInit(): void {
    }

    onPress(): void {
        this.route.navigate(['/documents', 'new']);
    }

}
