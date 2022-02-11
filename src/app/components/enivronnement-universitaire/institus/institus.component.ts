import {Component, OnInit} from '@angular/core';
import {Institus} from 'app/model/Institus';
import {Club} from '../../../model/Club';
import {UserService} from '../../../services/user.service';
import {InstitusService} from '../../../services/institus.service';
import {ClubService} from '../../../services/club.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {User} from '../../../model/User';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-institus',
    templateUrl: './institus.component.html',
    styleUrls: ['./institus.component.css']
})
export class InstitusComponent implements OnInit {


    currentPage = 1;
    nbMaxPage = 0;
    nbPage = 0; // on peut avoir pls pages donc on le regroupes par des pages , ceci represente sa numéro
    nbElmParPage = 10; // on veut afficher un nombre d'element par page et comme ca influence le nombre de pages
    nbMaxPage2 = 0;
    public Instituss: Institus[] = [];
    public Institus: Institus[] = [];
    public Instit: Institus[] = [];
    public Insti: Institus[] = [];
    public Clubs: Club[] = [];
    public listUniversite = ['Carthage', 'Gabes', 'Gafsa', 'ISET', 'Jendouba', 'Kairouan', 'Manar', 'Mannouba', 'Monastir'
        , 'Sfax', 'Sousse', 'Tunis', 'Zaytouna'];
    public zone = ['Ariana', 'Beja', 'BenArous', 'Bizerte', 'Gabes', 'Gafsa', 'Gbeli',
        'Jendouba', 'Kairouan', 'Kasserine', 'kef', 'Mahdia', 'Manouba', 'Mednine', 'Monastir',
        'Nabeul', 'Sfax', 'SidiBouZid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
    ];
    public listInn = ['Ecole d\'ingénieur', 'Ecole', 'Faculté', 'Foyer', 'Institus préparatoire',
        'Institus', 'Resto', 'Université', 'Institus Privé'];

    foulen: User;
    public isAdmin = false;


    file: File = null; // Variable to store file
    fileUploaded = false;
    fileIsUploading = false;
    fileUrl = '';
    message = '';

    constructor(private institusService: InstitusService, private router: Router,
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
        this.getInstituss();
    }

    onViewInstitus(id: number) {
        this.router.navigate(['/university', 'Institus', id]);
    }

    public getInstituss(): void {
        this.Instituss = [];
        this.Institus = [];
        this.Instit = [];
        this.Insti = [];
        this.institusService.getInstituss().subscribe(
            (response: Institus[]) => {
                this.Instit = [];
                this.Instituss = response;
                this.Instituss.sort(function (a, b) {
                        if (a.nomInstitus < b.nomInstitus) {
                            return -1;
                        }
                        if (a.nomInstitus > b.nomInstitus) {
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
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public search(key: string): void {
        const results: Institus[] = [];
        for (const doc of this.Instituss) {
            if (doc.nomInstitus.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.abreviation.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.universite.toLowerCase().indexOf(key.toLowerCase()) !== -1
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
            this.getInstituss();
        }
    }

    onSubmit(form: NgForm) {
        if ('' === form.value['page']) {
            this.nbElmParPage = 10;
        } else {
            this.nbElmParPage = form.value['page'];
        }
        const type = form.value['type'];
        const universite = form.value['universite'];
        const region = form.value['region'];
        const sexe = form.value['sexe'];


        let i = this.nbPage;
        let results: Institus[] = [];

        for (const doc of this.Instituss) {
            if (
                doc.type.toString().toLowerCase().indexOf(type.toLowerCase()) !== -1
                && doc.region.toLowerCase().indexOf(region.toLowerCase()) !== -1
                && doc.sexe.toLowerCase().indexOf(sexe.toLowerCase()) !== -1
                && doc.universite.toLowerCase().indexOf(universite.toLowerCase()) !== -1
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
            this.getInstituss();
        }
    }

    onPageChange(currentPage: number) {
        if (this.Institus.length === 0) {
            const results: Institus[] = [];
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
            const results: Institus[] = [];
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

    admine(form: NgForm) {
        const nom = form.value['nom'];
        const abr = form.value['abr'];
        const universite = form.value['universite'];
        const histo = form.value['histo'];
        const fil = form.value['fil'];
        const urls = form.value['urls'];
        const sexe = form.value['sexe'];
        const type = form.value['type'];
        const nbc = form.value['nbc'];
        const regl = form.value['regl'];
        const region = form.value['region'];
        const listClubs = form.value['listclubs'];
        if (this.fileUrl === '') {
            this.fileUrl = '../../../../assets/img/library/61.jpg';
        }

        const ins = {
            nomInstitus: nom,
            abreviation: abr,
            universite: universite,
            region: region,
            historique: histo,
            filieres: fil,
            picUrl: this.fileUrl,
            urls: urls,
            sexe: sexe,
            type: type,
            nbChambre: nbc,
            reglement: regl,
            listClubs: listClubs,
            voirAussi: ''
        };

        // @ts-ignore
        this.InstitusService.addInstitus(ins).subscribe(
            (response: Institus) => {
                this.router.navigate(['/environment-universitaire']);
            },
            error => {
                alert(error.message)
            }
        );


    }

    onUploadFile(file: File) {
        this.fileIsUploading = true;
        this.userService.uploadFile(file).then(
            // @ts-ignore
            (url: string) => {
                console.log('terminé!');
                console.log(url);
                this.fileUrl = url;
                this.fileIsUploading = false;
                this.fileUploaded = true;
                this.message = 'Chargé.';
            }
        );
    }

    // @ts-ignore
    detectFiles(event) {
        this.onUploadFile(event.target.files[0]);
    }


}
