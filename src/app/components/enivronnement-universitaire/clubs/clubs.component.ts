import {Component, OnInit} from '@angular/core';
import {Institus} from 'app/model/Institus';
import {Club} from '../../../model/Clubs';
import {InstitusService} from '../../../services/institus.service';
import {ClubService} from '../../../services/club.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {User} from '../../../model/User';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-clubs',
    templateUrl: './clubs.component.html',
    styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

    loading = true;
    foulen: User;
    public isAdmin = false;
    currentPage = 1;
    nbMaxPage = 0;
    nbPage = 0; // on peut avoir pls pages donc on le regroupes par des pages , ceci represente sa numéro
    nbElmParPage = 10; // on veut afficher un nombre d'element par page et comme ca influence le nombre de pages
    nbMaxPage2 = 0;
    public clubs: Club[] = [];
    public club: Club[] = [];
    public clu: Club[] = [];
    public cl: Club[] = [];
    public Institus: Institus[] = [];
    public isnext = false;
    public isprevious = false;
    // @ts-ignore
    file: File = null; // Variable to store file
    fileUploaded = false;
    fileIsUploading = false;
    fileUrl = '';
    message = '';
    grille = true;

    public domaines: string[] = [];

    constructor(private clubService: ClubService, private router: Router,
                private userService: UserService, private institusService: InstitusService) {
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
        this.getClubs();
    }

    onViewClub(id: number) {
        this.router.navigate(['/university', 'Clubs', id]);
    }

    public getClubs(): void {
        this.clubs = [];
        this.club = [];
        this.clu = [];
        this.cl = [];
        this.clubService.getClubs().subscribe(
            (response: Club[]) => {
                this.clu = [];
                this.clubs = response;
                let i = 0;
                for (const e of response) {
                    if ((this.domaines.indexOf(e.domaine) === -1)) {
                        this.domaines.push(e.domaine);
                    }
                }
                this.domaines.sort(function (a, b) {
                    if (a < b) {
                        return -1;
                    } else if (a > b) {
                        return 1;
                    }
                    return 0;
                });
                for (const e of response) {
                    if (i === this.nbElmParPage) {
                        break;
                    }
                    this.clu.push(e);
                    i++;
                }

                this.institusService.getInstituss().subscribe(
                    (responses: Institus[]) => {
                        this.Institus = responses;
                    },
                    (error: HttpErrorResponse) => {
                        alert(error.message);
                    }
                );

                this.nbMaxPage = Math.ceil(response.length / this.nbElmParPage);
                this.nbMaxPage2 = this.nbMaxPage * 10;
                if (this.nbMaxPage > 1) {
                    this.isnext = true;
                }
                this.loading = false;
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public search(key: string): void {
        const results: Club[] = [];
        for (const doc of this.clubs) {
            if (doc.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.domaine.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
                results.push(doc);
            }
        }
        this.clu = [];
        for (const doc of results) {
            this.clu.push(doc);
        }
        this.nbMaxPage = Math.ceil(results.length / this.nbElmParPage);
        this.nbMaxPage2 = this.nbMaxPage * 10;

        if (results.length === 0 || !key) {
            this.getClubs();
        }
    }

    onSubmit(form: NgForm) {
        if ('' === form.value['page']) {
            this.nbElmParPage = 5;
        } else {
            this.nbElmParPage = form.value['page'];
        }
        const domaine = form.value['domaine'];

        let i = this.nbPage;
        let results: Club[] = [];
        for (const doc of this.clubs) {
            if (
                doc.domaine.toString().toLowerCase().indexOf(domaine.toLowerCase()) !== -1
            ) {
                results.push(doc);
            }
        }
        this.nbMaxPage = Math.ceil(results.length / this.nbElmParPage);
        this.nbMaxPage2 = this.nbMaxPage * 10;

        if (this.nbMaxPage > 1) {
            this.isnext = true;
        }
        this.club = results;
        results = [];
        for (const doc of this.club) {
            results.push(doc);
            i++;
            if (i === this.nbElmParPage) {
                break;
            }
        }
        this.cl = results;
        if (results.length === 0) {
            this.getClubs();
        }
    }

    onPageChange(currentPage: number) {
        if (this.club.length === 0) {
            const results: Club[] = [];
            let i = 0;
            for (const doc of this.clubs) {
                if (i < this.nbElmParPage * (currentPage - 1)) {
                    i++;
                    continue;
                }
                results.push(doc);
                i++;
                if (i === (currentPage) * this.nbElmParPage) {
                    break;
                }
            }
            this.clu = results;
        } else {
            const results: Club[] = [];
            let i = 0;
            for (const doc of this.club) {
                if (i < this.nbElmParPage * (currentPage - 1)) {
                    i++;
                    continue;
                }
                results.push(doc);
                i++;
                if (i === (currentPage) * this.nbElmParPage) {
                    break;
                }
            }
            this.cl = results;
        }
    }

    admine(form: NgForm) {
        const nom = form.value['nom'];
        const domaine = form.value['domaine'];
        const domaines = form.value['domaines'];
        const histo = form.value['histo'];
        const urls = form.value['urls'];
        let ddd = domaine;
        if (domaines !== '') {
            ddd = domaines
        }


        const ins = {
            nom: nom,
            domaine: ddd,
            historique: histo,
            picsUrls: this.fileUrl,
            urlPartenaires: urls,
        };

        // @ts-ignore
        this.clubService.addClub(ins).subscribe(
            (response: Club) => {
                this.router.navigate(['/environment-universitaire']);
            },
            error => {
                alert(error.message)
            }
        );


    }

    onGrille() {
        this.grille = !this.grille;
    }

}
