import {Component, OnInit} from '@angular/core';
import {Journey} from '../../../model/Journey';
import {JourneyService} from '../../../services/journey.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClubService} from '../../../services/club.service';
import {CentreFormationService} from '../../../services/centre-formation.service';
import {InstitusService} from '../../../services/institus.service';
import {Institus} from '../../../model/Institus';
import {Club} from '../../../model/Club';
import {CentreFormation} from '../../../model/CentreFormation';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-one-journey',
    templateUrl: './one-journey.component.html',
    styleUrls: ['./one-journey.component.css']
})
export class OneJourneyComponent implements OnInit {


    comp: Journey;
    img = '';
    start = '';
    finish = '';
    limitDate = '';
    themes = [];
    clubs = [];
    cfs = [];
    institus = [];

    constructor(private journeyService: JourneyService, private route: ActivatedRoute,
                private router: Router, private clubService: ClubService, private cfService: CentreFormationService,
                private isntitusService: InstitusService) {
    }

    ngOnInit(): void {
        this.journeyService.getJourneyById(this.route.snapshot.params['id']).subscribe(
            (resolve: Journey) => {
                this.comp = resolve;
                this.img = resolve.affiche;
                this.start = new Date(resolve.startingDate).toDateString();
                this.finish = new Date(resolve.finishingDate).toDateString();
                this.limitDate = new Date(resolve.registrationDateLimit).toDateString();
                this.themes = resolve.themes.split(',');
                let h;
                this.isntitusService.getInstituss().subscribe(
                    (result: Institus[]) => {
                        h = resolve.institus.split((','));
                        for (const x of result) {
                            if (h.indexOf(x.idInstitus.toString()) !== -1) {
                                this.institus.push(x);
                            }
                        }
                    }
                );
                this.clubService.getClubs().subscribe(
                    (result: Club[]) => {
                        h = resolve.clubs.split((','));
                        for (const x of result) {
                            if (h.indexOf(x.idClub.toString()) !== -1) {
                                this.clubs.push(x);
                            }
                        }
                    }
                );
                this.cfService.getCentreFormations().subscribe(
                    (result: CentreFormation[]) => {
                        h = resolve.trainingCenters.split(',');
                        for (const x of result) {
                            if (h.indexOf(x.idCf.toString()) !== -1) {
                                this.cfs.push(x);
                            }
                        }
                    }
                );
            }, (error: HttpErrorResponse) => {
                console.log('dawa7 hey !');
            }
        );
    }

    // todo  nchouf el address keni web link donc twalli lien ! ;)

}
