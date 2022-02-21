import {Component, OnInit} from '@angular/core';
import {CompetitionService} from '../../../services/competition.service';
import {Competition} from '../../../model/Competition';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-one-competition',
    templateUrl: './one-competition.component.html',
    styleUrls: ['./one-competition.component.css']
})
export class OneCompetitionComponent implements OnInit {

    comp: Competition;
    img = '';

    constructor(private competitionService: CompetitionService, private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.competitionService.getCompetitionById(this.route.snapshot.params['id']).subscribe(
            (resolve: Competition) => {
                this.comp = resolve;
                this.img = resolve.affiche;
            }, (error: HttpErrorResponse) => {
                console.log('dawa7 hey !');
            }
        );
    }

}
