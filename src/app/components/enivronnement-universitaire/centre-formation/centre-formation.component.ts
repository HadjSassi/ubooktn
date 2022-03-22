import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../model/User';
import {Club} from '../../../model/Club';
import {ClubService} from '../../../services/club.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {InstitusService} from '../../../services/institus.service';
import * as firebase from 'firebase';
import {environment} from '../../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {CentreFormation} from '../../../model/CentreFormation';
import {CentreFormationService} from '../../../services/centre-formation.service';

@Component({
    selector: 'app-centre-formation',
    templateUrl: './centre-formation.component.html',
    styleUrls: ['./centre-formation.component.css']
})
export class CentreFormationComponent implements OnInit {


    loading = true;
    currentPage = 1;
    nbMaxPage = 0;
    nbPage = 0; // on peut avoir pls pages donc on le regroupes par des pages , ceci represente sa numéro
    nbElmParPage = 10; // on veut afficher un nombre d'element par page et comme ca influence le nombre de pages
    nbMaxPage2 = 0;
    public Instituss: CentreFormation[] = [];
    public Institus: CentreFormation[] = [];
    public Instit: CentreFormation[] = [];
    public Insti: CentreFormation[] = [];
    public Clubs: Club[] = [];
    public zone = ['Ariana', 'Beja', 'BenArous', 'Bizerte', 'Gabes', 'Gafsa', 'Gbeli',
        'Jendouba', 'Kairouan', 'Kasserine', 'kef', 'Mahdia', 'Manouba', 'Mednine', 'Monastir',
        'Nabeul', 'Sfax', 'SidiBouZid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
    ];


    foulen: User;
    public isAdmin = false;


    file: File = null; // Variable to store file
    fileUploaded = false;
    fileIsUploading = false;
    fileUrl = '';
    message = '';
    grille = true;

    constructor(private centreFormationService: CentreFormationService, private router: Router,
                private userService: UserService, private clubService: ClubService) {
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
        this.getCentreFormation();
    }

    onViewCentreFormation(id: number) {
        this.router.navigate(['/university', 'TrainingCenter', id]);
    }

    public getCentreFormation(): void {
        this.Instituss = [];
        this.Institus = [];
        this.Instit = [];
        this.Insti = [];
        this.centreFormationService.getCentreFormations().subscribe(
            (response: CentreFormation[]) => {
                this.Instit = [];
                this.Instituss = response;
                this.Instituss.sort(function (a, b) {
                        if (a.nomCf < b.nomCf) {
                            return -1;
                        }
                        if (a.nomCf > b.nomCf) {
                            return 1;
                        }
                        return 0;
                    }
                );
                let i = 0;
                for (const e of response) {
                    if (i === this.nbElmParPage) {
                        break;
                    }
                    this.Instit.push(e);
                    i++;
                }
                this.nbMaxPage = Math.ceil(response.length / this.nbElmParPage);
                this.nbMaxPage2 = this.nbMaxPage * 10;
                this.clubService.getClubs().subscribe(
                    (responses: Club[]) => {
                        this.Clubs = responses;
                    },
                    (error: HttpErrorResponse) => {
                        alert(error.message);
                    }
                );
                this.loading = false;
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public search(key: string): void {
        const results: CentreFormation[] = [];
        for (const doc of this.Instituss) {
            if (doc.nomCf.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.abreviation.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.domaines.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.region.toLowerCase().indexOf(key.toLowerCase()) !== -1
            ) {
                results.push(doc);
            }
        }
        this.Institus = results;
        this.Insti = [];
        let i = 0;
        for (const doc of results) {
            this.Insti.push(doc);
            i++;
            if (i === this.nbElmParPage) {
                break;
            }
        }
        this.nbMaxPage = Math.ceil(results.length / this.nbElmParPage);
        this.nbMaxPage2 = this.nbMaxPage * 10;

        if (results.length === 0 || !key) {
            this.getCentreFormation();
        }
    }

    onSubmit(form: NgForm) {
        if ('' === form.value['page']) {
            this.nbElmParPage = 10;
        } else {
            this.nbElmParPage = form.value['page'];
        }
        const region = form.value['region'];
        let Informatique = '';
        let Multimedia = '';
        let Robotique = '';
        let Literature = '';
        let Management = '';
        let Other = '';
        if (form.value['Informatique']) {
            Informatique = document.getElementById('Informatique').attributes['value'].value;
        }
        if (form.value['Multimedia']) {
            Multimedia = document.getElementById('Multimedia').attributes['value'].value;
        }
        if (form.value['Robotique']) {
            Robotique = document.getElementById('Robotique').attributes['value'].value;
        }
        if (form.value['Literature']) {
            Literature = document.getElementById('Literature').attributes['value'].value;
        }
        if (form.value['Management']) {
            Management = document.getElementById('Management').attributes['value'].value;
        }
        if (form.value['Other']) {
            Other = document.getElementById('Other').attributes['value'].value;
        }
        console.log(region);
        console.log(Informatique);
        console.log(Multimedia);
        console.log(Robotique);
        console.log(Literature);
        console.log(Management);
        console.log(Other);
        let i = this.nbPage;
        let results: CentreFormation[] = [];

        for (const doc of this.Instituss) {
            if (
                doc.domaines.toString().toLowerCase().indexOf(Informatique.toLowerCase()) !== -1
                && doc.domaines.toString().toLowerCase().indexOf(Multimedia.toLowerCase()) !== -1
                && doc.domaines.toString().toLowerCase().indexOf(Robotique.toLowerCase()) !== -1
                && doc.domaines.toString().toLowerCase().indexOf(Literature.toLowerCase()) !== -1
                && doc.domaines.toString().toLowerCase().indexOf(Management.toLowerCase()) !== -1
                && doc.domaines.toString().toLowerCase().indexOf(Other.toLowerCase()) !== -1
                && doc.region.toLowerCase().indexOf(region.toLowerCase()) !== -1
            ) {
                results.push(doc);
            }
        }
        this.nbMaxPage = Math.ceil(results.length / this.nbElmParPage);
        this.nbMaxPage2 = this.nbMaxPage * 10;

        this.Institus = results;
        results = [];
        for (const doc of this.Institus) {
            results.push(doc);
            i++;
            if (i === this.nbElmParPage) {
                break;
            }
        }
        this.Insti = results;
        if (results.length === 0) {
            this.getCentreFormation();
        }
    }

    onPageChange(currentPage: number) {
        if (this.Institus.length === 0) {
            const results: CentreFormation[] = [];
            let i = 0;
            for (const doc of this.Instituss) {
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
            this.Instit = results;
        } else {
            const results: CentreFormation[] = [];
            let i = 0;
            for (const doc of this.Institus) {
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
            this.Insti = results;
        }
    }

    onGrille() {
        this.grille = !this.grille;
    }

}
