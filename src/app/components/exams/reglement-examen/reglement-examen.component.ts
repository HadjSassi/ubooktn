import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-reglement-examen',
    templateUrl: './reglement-examen.component.html',
    styleUrls: ['./reglement-examen.component.css']
})
export class ReglementExamenComponent implements OnInit {

    constructor(private route: Router) {
    }

    ngOnInit(): void {
    }


    onPress(): void {
        this.route.navigate(['/exams', 'new']);
    }

}
