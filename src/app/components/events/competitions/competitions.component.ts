import {Component, OnInit} from '@angular/core';
import {CentreFormation} from '../../../model/CentreFormation';
import {Club} from '../../../model/Club';
import {User} from '../../../model/User';
import {CentreFormationService} from '../../../services/centre-formation.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ClubService} from '../../../services/club.service';
import * as firebase from 'firebase';
import {environment} from '../../../../environments/environment';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {CompetitionService} from '../../../services/competition.service';
import {Competition} from '../../../model/Competition';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {InstitusService} from '../../../services/institus.service';
import {Institus} from '../../../model/Institus';

@Component({
    selector: 'app-competitions',
    templateUrl: './competitions.component.html',
    styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {


    currentPage = 1;
    nbMaxPage = 0;
    nbPage = 0; // on peut avoir pls pages donc on le regroupes par des pages , ceci represente sa numéro
    nbElmParPage = 10; // on veut afficher un nombre d'element par page et comme ca influence le nombre de pages
    nbMaxPage2 = 0;
    public Evenements: Competition[] = [];
    public Evenement: Competition[] = [];
    public evenements: Competition[] = [];
    public evenement: Competition[] = [];
    public zone = ['Ariana', 'Beja', 'BenArous', 'Bizerte', 'Gabes', 'Gafsa', 'Gbeli',
        'Jendouba', 'Kairouan', 'Kasserine', 'kef', 'Mahdia', 'Manouba', 'Mednine', 'Monastir',
        'Nabeul', 'Sfax', 'SidiBouZid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
    ];
    foulen: User;
    public isAdmin = false;
    startings: NgbDateStruct;
    finishings: NgbDateStruct;
    capacitySlider = 40;
    priceSlider = [0, 40];
    freeIndicator = 'Free';
    focus: any;
    file: File = null; // Variable to store file
    fileUploaded = false;
    fileIsUploading = false;
    fileUrl = '';
    message = '';
    clubss: Club[] = [];
    clubs: number[] = [];
    listClubsNames: string[] = [];
    instituss: Institus[] = [];
    institus: number[] = [];
    listInstitusNames: string[] = [];
    listInstitusabrev: string[] = [];
    cfs: CentreFormation[] = [];
    cf: number[] = [];
    listCfNames: string[] = [];
    listCfabrev: string[] = [];

    constructor(private competitionService: CompetitionService, private router: Router,
                private userService: UserService, private clubService: ClubService,
                private instituService: InstitusService, private cfService: CentreFormationService) {
    }

    ngOnInit(): void {
        this.clubService.getClubs().subscribe(
            (response: Club[]) => {
                this.clubss = response;
                for (const i of response) {
                    this.clubs.push(i.idClub);
                }
            }, (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
        this.instituService.getInstituss().subscribe(
            (response: Institus[]) => {
                this.instituss = response;
                for (const i of response) {
                    this.institus.push(i.idInstitus);
                }
            }, (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
        this.cfService.getCentreFormations().subscribe(
            (response: CentreFormation[]) => {
                this.cfs = response;
                for (const i of response) {
                    this.cf.push(i.idCf);
                }
            }, (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
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
        this.getCompetions();
    }

    onViewCompetition(id: number) {
        this.router.navigate(['/event', 'competitions', id]);
    }

    public getCompetions(): void {
        this.Evenements = [];
        this.Evenement = [];
        this.evenements = [];
        this.evenement = [];
        this.competitionService.getCompetitions().subscribe(
            (response: Competition[]) => {
                this.Evenements = response;
                this.Evenements.sort(function (a, b) {
                        if (a.nom < b.nom) {
                            return -1;
                        }
                        if (a.nom > b.nom) {
                            return 1;
                        }
                        return 0;
                    }
                );
                let z;
                const listClubs: string[] = [];
                const listInstitus: string[] = [];
                const listCf: string[] = [];
                for (const x of this.Evenements) {
                    listClubs.push(x.clubs);
                    listInstitus.push(x.institus);
                    listCf.push(x.trainingCenters);
                }
                for (const x of listClubs) {
                    let ch = '';
                    const list = x.split(',');
                    for (const y of list) {
                        z = this.clubs.indexOf(Number(y));
                        const name = this.clubss[z];
                        ch = ch + name.nomClub + ',';
                    }
                    this.listClubsNames.push(ch);
                }
                for (const x of listInstitus) {
                    let ch = '';
                    let sh = '';
                    const list = x.split(',');
                    for (const y of list) {
                        z = this.institus.indexOf(Number(y));
                        const name = this.instituss[z];
                        sh = sh + name.abreviation + ',';
                        ch = ch + name.nomInstitus + ',';

                    }
                    this.listInstitusNames.push(ch);
                    this.listInstitusabrev.push(sh);
                }
                for (const x of listCf) {
                    let ch = '';
                    let sh = '';
                    const list = x.split(',');
                    for (const y of list) {
                        z = this.cf.indexOf(Number(y));
                        const name = this.cfs[z];
                        ch = ch + name.nomCf + ',';
                        if (sh !== null) {
                            sh = sh + name.abreviation + ',';
                        }
                    }
                    this.listCfNames.push(ch);
                    this.listCfabrev.push(sh);
                }
                let i = 0;
                for (const e of response) {
                    if (i === this.nbElmParPage) {
                        break;
                    }
                    this.evenements.push(e);
                    i++;
                }
                this.nbMaxPage = Math.ceil(response.length / this.nbElmParPage);
                this.nbMaxPage2 = this.nbMaxPage * 10;
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public search(key: string): void {
        const results: Competition[] = [];
        let j = 0;
        for (const doc of this.Evenements) {
            if (doc.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.partenaires.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || this.listInstitusNames[j].toLowerCase().indexOf(key.toLowerCase()) !== -1
                || this.listInstitusabrev[j].toLowerCase().indexOf(key.toLowerCase()) !== -1
                || this.listCfNames[j].toLowerCase().indexOf(key.toLowerCase()) !== -1
                || this.listCfabrev[j].toLowerCase().indexOf(key.toLowerCase()) !== -1
                || this.listClubsNames[j].toLowerCase().indexOf(key.toLowerCase()) !== -1
            ) {
                results.push(doc);
            }
            j++;
            /*if (this.listClubsNames[j].toLowerCase().indexOf(key.toLowerCase()) !== -1
                || this.listInstitusNames[j].toLowerCase().indexOf(key.toLowerCase()) !== -1
                || this.listCfNames[j].toLowerCase().indexOf(key.toLowerCase()) !== -1
            ) {
                results.push(doc);
            }*/
        }
        this.Evenement = results;
        this.evenement = [];
        let i = 0;
        for (const doc of results) {
            this.evenement.push(doc);
            i++;
            if (i === this.nbElmParPage) {
                break;
            }
        }
        this.nbMaxPage = Math.ceil(results.length / this.nbElmParPage);
        this.nbMaxPage2 = this.nbMaxPage * 10;

        if (results.length === 0 || !key) {
            this.getCompetions();
        }
    }

    onSubmit(form: NgForm) {
        if (this.priceSlider[0] === 0) {
            this.freeIndicator = 'Free';
        } else {
            this.freeIndicator = this.priceSlider[0].toString();
        }

        if ('' === form.value['page']) {
            this.nbElmParPage = 10;
        } else {
            this.nbElmParPage = form.value['page'];
        }
        let Hackathon = '';
        let Informatique = '';
        let Entrepreneurship = '';
        let Robotique = '';
        let Literature = '';
        let Management = '';
        let Other = '';
        const starting = form.value['starting'];
        const finishing = form.value['finishing'];
        if (form.value['Hackathon']) {
            Hackathon = document.getElementById('Hackathon').attributes['value'].value;
        }
        if (form.value['Informatique']) {
            Informatique = document.getElementById('Informatique').attributes['value'].value;
        }
        if (form.value['Entrepreneurship']) {
            Entrepreneurship = document.getElementById('Entrepreneurship').attributes['value'].value;
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
        console.log(Hackathon);
        console.log(Entrepreneurship);
        console.log(Informatique);
        console.log(Robotique);
        console.log(Literature);
        console.log(Management);
        console.log(Other);
        console.log(this.capacitySlider);
        console.log(this.priceSlider);
        console.log(starting);
        console.log(finishing);
        let i = this.nbPage;
        let results: Competition[] = [];

        for (const doc of this.Evenements) {
            if (
                doc.themes.toString().toLowerCase().indexOf(Hackathon.toLowerCase()) !== -1
                && doc.themes.toString().toLowerCase().indexOf(Entrepreneurship.toLowerCase()) !== -1
                && doc.themes.toString().toLowerCase().indexOf(Informatique.toLowerCase()) !== -1
                && doc.themes.toString().toLowerCase().indexOf(Robotique.toLowerCase()) !== -1
                && doc.themes.toString().toLowerCase().indexOf(Literature.toLowerCase()) !== -1
                && doc.themes.toString().toLowerCase().indexOf(Management.toLowerCase()) !== -1
                && doc.themes.toString().toLowerCase().indexOf(Other.toLowerCase()) !== -1
            ) {
                results.push(doc);
            }
            if (
                Number(doc.capacity) <= this.capacitySlider
                && Number(doc.price) <= this.priceSlider[1]
                && Number(doc.price) >= this.priceSlider[0]
            ) {
                results.push(doc);
            }
        }
        this.nbMaxPage = Math.ceil(results.length / this.nbElmParPage);
        this.nbMaxPage2 = this.nbMaxPage * 10;

        this.Evenement = results;
        results = [];
        for (const doc of this.Evenement) {
            results.push(doc);
            i++;
            if (i === this.nbElmParPage) {
                break;
            }
        }
        this.evenement = results;
        if (results.length === 0) {
            this.getCompetions();
        }
    }

    onPageChange(currentPage: number) {
        if (this.Evenement.length === 0) {
            const results: Competition[] = [];
            let i = 0;
            for (const doc of this.Evenements) {
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
            this.evenements = results;
        } else {
            const results: Competition[] = [];
            let i = 0;
            for (const doc of this.Evenement) {
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
            this.evenement = results;
        }
    }

}
