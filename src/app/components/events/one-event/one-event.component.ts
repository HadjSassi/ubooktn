import {Component, OnInit} from '@angular/core';
import {Event} from '../../../model/Event';
import {ActivatedRoute, Router} from '@angular/router';
import {ClubService} from '../../../services/club.service';
import {CentreFormationService} from '../../../services/centre-formation.service';
import {InstitusService} from '../../../services/institus.service';
import {Institus} from '../../../model/Institus';
import {Club} from '../../../model/Clubs';
import {CentreFormation} from '../../../model/CentreFormation';
import {HttpErrorResponse} from '@angular/common/http';
import {EventService} from '../../../services/event.service';
import {UserService} from '../../../services/user.service';
import * as firebase from 'firebase';
import {User} from '../../../model/User';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-one-event',
    templateUrl: './one-event.component.html',
    styleUrls: ['./one-event.component.css']
})
export class OneEventComponent implements OnInit {

    comp: Event;
    img = '';
    start = '';
    finish = '';
    limitDate = '';
    themes = [];
    clubs = [];
    cfs = [];
    institus = [];
    partenaires = [];
    isAuthor = false;
    booked = false;

    constructor(private eventService: EventService, private route: ActivatedRoute,
                private router: Router, private clubService: ClubService, private cfService: CentreFormationService,
                private isntitusService: InstitusService, private userService: UserService) {
    }

    ngOnInit(): void {
        this.eventService.getEventById(this.route.snapshot.params['id']).subscribe(
            (resolve: Event) => {
                this.comp = resolve;
                this.img = resolve.affiche;
                console.log(resolve);
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        console.log(user.uid, this.comp.uid, user.uid === this.comp.uid.uid);
                        if (user.uid === this.comp.uid.uid) {
                            this.isAuthor = true;
                        }
                        if (this.comp.participants.indexOf(user.uid) !== -1) {
                            this.booked = true;
                        }
                    }
                );
                this.partenaires = this.comp.partenaires.split(',');
                this.start = new Date(resolve.startingDate).toDateString();
                this.finish = new Date(resolve.finishingDate).toDateString();
                this.limitDate = new Date(resolve.registrationDateLimit).toDateString();
                this.themes = resolve.themes.split(',');
                let h;
                this.isntitusService.getInstituss().subscribe(
                    (result: Institus[]) => {
                        h = resolve.institus.split((','));
                        for (const x of result) {
                            if (h.indexOf(x.id.toString()) !== -1) {
                                this.institus.push(x);
                            }
                        }
                    }
                );
                this.clubService.getClubs().subscribe(
                    (result: Club[]) => {
                        h = resolve.clubs.split((','));
                        for (const x of result) {
                            if (h.indexOf(x.id.toString()) !== -1) {
                                this.clubs.push(x);
                            }
                        }
                    }
                );
                this.cfService.getCentreFormations().subscribe(
                    (result: CentreFormation[]) => {
                        h = resolve.trainingCenters.split(',');
                        for (const x of result) {
                            if (h.indexOf(x.id.toString()) !== -1) {
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

    urling(ch: string) {
        return /^(ftp|http|https):\/\/[^ "]+$/.test(ch);
    }
}
