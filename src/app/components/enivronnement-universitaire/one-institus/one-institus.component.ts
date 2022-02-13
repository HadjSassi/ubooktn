import {Component, OnInit} from '@angular/core';
import {InstitusService} from '../../../services/institus.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ClubService} from '../../../services/club.service';
import {UserService} from '../../../services/user.service';
import {Club} from '../../../model/Club';
import {Institus} from '../../../model/Institus';
import {HttpErrorResponse} from '@angular/common/http';
import * as firebase from 'firebase';
import {User} from '../../../model/User';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-one-institus',
    templateUrl: './one-institus.component.html',
    styleUrls: ['./one-institus.component.css']
})
export class OneInstitusComponent implements OnInit {


    // @ts-ignore
    public intitus: Institus;
    public link = '';
    public linkClub: Club[] = [];
    public linkInstitus: Institus[] = [];
    public filiere: string[] = [];
    public picsUrl: string[] = [];
    public urls: string[] = [];
    foulen: User;
    public isAdmin = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private clubService: ClubService,
                private institusService: InstitusService,
                private userService: UserService) {
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

        this.institusService.getInstitusById(id).subscribe(
            (response: Institus) => {
                this.intitus = response;
                this.filiere = response.filieres.split(',');
                this.picsUrl = response.picUrl.split(',');
                this.urls = response.urls.split(',');
                this.link = response.urlOfficel;
                const linkClub = response.listClubs.split(',');
                const linkInstitus = response.listInstitus.split(',');
                this.clubService.getClubs().subscribe(
                    (responses: Club[]) => {
                        for (const r of responses) {
                            for (const l of linkClub) {
                                if (r.idClub.toString() === l) {
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
                            for (const l of linkInstitus) {
                                if (r.idInstitus.toString() === l) {
                                    this.linkInstitus.push(r);
                                }
                            }
                        }
                    },
                    error => {
                        alert(error.message);
                    }
                );
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );


    }


    del() {
        const id: number = this.route.snapshot.params['id'] - 0;
        this.router.navigate(['/environment-universitaire/Institus/']);
        this.institusService.deleteInstitus(id).subscribe();
    }

}
