import {Component, OnInit} from '@angular/core';
import {Institus} from '../../../model/Institus';
import {Club} from '../../../model/Clubs';
import {User} from '../../../model/User';
import {ActivatedRoute, Router} from '@angular/router';
import {ClubService} from '../../../services/club.service';
import {InstitusService} from '../../../services/institus.service';
import {UserService} from '../../../services/user.service';
import * as firebase from 'firebase';
import {environment} from '../../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {CentreFormationService} from '../../../services/centre-formation.service';
import {CentreFormation} from '../../../model/CentreFormation';

@Component({
    selector: 'app-one-centre-formation',
    templateUrl: './one-centre-formation.component.html',
    styleUrls: ['./one-centre-formation.component.css']
})
export class OneCentreFormationComponent implements OnInit {


    public intitus: Institus;
    public cf: CentreFormation;
    public link = '';
    public linkClub: Club[] = [];
    public linkInstitus: Institus[] = [];
    public linkPartenaires: string[] = [];
    public picsUrl: string[] = [];
    public filiere: string[] = [];
    foulen: User;
    public isAdmin = false;
    public img;


    constructor(private route: ActivatedRoute,
                private router: Router,
                private clubService: ClubService,
                private institusService: InstitusService,
                private userService: UserService,
                private centreFormationService: CentreFormationService) {
    }

    ngOnInit(): void {
        let uid = '';
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    uid = user.uid.toString();
                    this.userService.getUsers().subscribe(
                        (response: User[]) => {
                            for (const i of response) {
                                if (i.uid === uid) {
                                    this.foulen = i;
                                    if (this.foulen.mailUser === environment.admine) {
                                        this.isAdmin = true
                                    }
                                    break;
                                }
                            }
                        },
                        (error: HttpErrorResponse) => {
                            alert(error.message);
                        }
                    );
                } else {
                    uid = 'dawa7';
                    console.log('dawa7 ha mbarka');
                }
            }
        );
        const id: number = this.route.snapshot.params['id'] - 0;

        this.centreFormationService.getCentreFormationById(id).subscribe(
            (response: CentreFormation) => {
                this.cf = response;
                if (response.domaines !== '') {
                    this.filiere = response.domaines.split(',');
                }
                if (response.picsUrls !== '') {
                    this.picsUrl = response.picsUrls.split(',');
                    this.img = this.picsUrl[0];
                }
                let clubing = [];
                if (response.urlClubs !== '') {
                    clubing = response.urlClubs.split(',');
                }
                let instituing = [];
                if (response.urlInstitus !== '') {
                    instituing = response.urlInstitus.split(',');
                }
                if (response.urlPartenaires !== '') {
                    this.linkPartenaires = response.urlPartenaires.split(',');
                }
                this.clubService.getClubs().subscribe(
                    (responses: Club[]) => {
                        for (const r of responses) {
                            for (const l of clubing) {
                                if (r.id.toString() === l) {
                                    this.linkClub.push(r);
                                }
                            }
                        }
                    },
                    error => {
                        alert(error.message);
                    }
                );
                this.institusService.getInstituss().subscribe(
                    (responses: Institus[]) => {
                        for (const r of responses) {
                            for (const l of instituing) {
                                if (r.id.toString() === l) {
                                    this.linkInstitus.push(r);
                                }
                            }
                        }
                    },
                    error => {
                        alert(error.message);
                    }
                );
            }, (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        );
    }


    del() {
        const id: number = this.route.snapshot.params['id'] - 0;
        this.router.navigate(['/environment-universitaire/Institus/']);
        this.institusService.deleteInstitus(id).subscribe();
    }

}
