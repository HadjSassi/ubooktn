import {Component, OnInit} from '@angular/core';
import {Journey} from '../../../model/Journey';
import {User} from '../../../model/User';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Club} from '../../../model/Club';
import {Institus} from '../../../model/Institus';
import {CentreFormation} from '../../../model/CentreFormation';
import {JourneyService} from '../../../services/journey.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {ClubService} from '../../../services/club.service';
import {InstitusService} from '../../../services/institus.service';
import {CentreFormationService} from '../../../services/centre-formation.service';
import {HttpErrorResponse} from '@angular/common/http';
import * as firebase from 'firebase';
import {environment} from '../../../../environments/environment';
import {NgForm} from '@angular/forms';
import {SettingsService} from '../../../services/settings.service';

@Component({
    selector: 'app-journey',
    templateUrl: './journey.component.html',
    styleUrls: ['./journey.component.css']
})
export class JourneyComponent implements OnInit {


    currentPage = 1;
    nbMaxPage = 0;
    nbPage = 0; // on peut avoir pls pages donc on le regroupes par des pages , ceci represente sa numéro
    nbElmParPage = 10; // on veut afficher un nombre d'element par page et comme ca influence le nombre de pages
    nbMaxPage2 = 0;
    public Evenements: Journey[] = [];
    public Evenement: Journey[] = [];
    public evenements: Journey[] = [];
    public evenement: Journey[] = [];
    public zone = ['Ariana', 'Beja', 'BenArous', 'Bizerte', 'Gabes', 'Gafsa', 'Gbeli',
        'Jendouba', 'Kairouan', 'Kasserine', 'kef', 'Mahdia', 'Manouba', 'Mednine', 'Monastir',
        'Nabeul', 'Sfax', 'SidiBouZid', 'Siliana', 'Sousse', 'Tataouine', 'Tozeur', 'Tunis', 'Zaghouan'
    ];
    foulen: User;
    public isAdmin = false;
    priceSlider = [0, 5000];
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
    themes = this.settingsService.themes;
    themeT = [];
    startings: NgbDateStruct = {year: new Date().getUTCFullYear() - 2, month: 1, day: 1};
    startD: NgbDateStruct;
    startB = false;
    finishings: NgbDateStruct;
    finishD: NgbDateStruct = {year: new Date().getUTCFullYear() - 2, month: 1, day: 1};
    finishB = false;
    loading = true;
    constructor(private journeyService: JourneyService, private router: Router,
                private userService: UserService, private clubService: ClubService,
                private instituService: InstitusService, private cfService: CentreFormationService,
                private settingsService: SettingsService) {
    }

    ngOnInit(): void {
        this.clubss = this.settingsService.listClubs;
        for (const i of this.clubss) {
            this.clubs.push(i.idClub);
        }
        this.instituss = this.settingsService.listInstitus;
        for (const i of this.instituss) {
            this.institus.push(i.idInstitus);
        }
        this.cfs = this.settingsService.listCfs;
        for (const i of this.cfs) {
            this.cf.push(i.idCf);
        }
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

    onViewJourney(id: number) {
        this.router.navigate(['/event', 'journey', id]);
    }

    public getCompetions(): void {
        this.Evenements = [];
        this.Evenement = [];
        this.evenements = [];
        this.evenement = [];
        this.journeyService.getJourneys().subscribe(
            (response: Journey[]) => {
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
                this.loading = false;
            },
            (error: HttpErrorResponse) => {
                alert(error.message);
            }
        );
    }

    public search(key: string): void {
        const results: Journey[] = [];
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
            if (x === '') {
                this.listClubsNames.push('');
                continue;
            }
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
            if (x === '') {
                this.listInstitusNames.push('');
                this.listInstitusabrev.push('');
                continue;
            }
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
            if (x === '') {
                this.listCfNames.push('');
                this.listCfabrev.push('');
                continue;
            }
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
            this.freeIndicator = this.priceSlider[0] + 'DT';
        }

        if ('' === form.value['page']) {
            this.nbElmParPage = 10;
        } else {
            this.nbElmParPage = form.value['page'];
        }
        console.log(this.priceSlider);
        console.log(this.startD);
        console.log(this.finishings);
        let i = this.nbPage;
        let results: Journey[] = [];

        for (const doc of this.Evenements) {
            if (
                this.validateTheme(this.themeT, doc.themes)
                && Number(doc.price) <= this.priceSlider[1]
                && Number(doc.price) >= this.priceSlider[0]
                && this.verifDate(doc.startingDate, doc.finishingDate, this.startD, this.finishings)
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
            const results: Journey[] = [];
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
            const results: Journey[] = [];
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

    verifDate(eventS: string, eventF: string, starting: NgbDateStruct, finishing: NgbDateStruct) {
        const eventS1: Date = new Date(eventS);
        const eventF1: Date = new Date(eventF);
        if (this.finishB && !this.startB) {
            const finishing1: Date = new Date(finishing.month + ' ' + finishing.day + ' ' + finishing.year);
            return finishing1.getTime() >= eventS1.getTime()
                && finishing1.getTime() >= eventF1.getTime();
        } else if (!this.startB && !this.finishB) {
            return true;
        } else if (this.startB && !this.finishB) {
            const starting1: Date = new Date(starting.month + ' ' + starting.day + ' ' + starting.year);
            return starting1.getTime() <= eventS1.getTime()
                && starting1.getTime() <= eventF1.getTime();
        } else {
            const starting1: Date = new Date(starting.month + ' ' + starting.day + ' ' + starting.year);
            const finishing1: Date = new Date(finishing.month + ' ' + finishing.day + ' ' + finishing.year);
            return starting1.getTime() <= eventS1.getTime()
                && starting1.getTime() <= eventF1.getTime()
                && finishing1.getTime() >= eventS1.getTime()
                && finishing1.getTime() >= eventF1.getTime();
        }
    }

    themeing(ch: string) {
        if (this.themeT.indexOf(ch) === -1) {
            this.themeT.push(ch);
            this.themeT.sort();
        } else {
            this.themeT.splice(this.themeT.indexOf(ch), 1);
        }
    }

    validateTheme(themeT: string[], ch: string) {
        const list = ch.split(',');
        for (const x of themeT) {
            if (list.indexOf(x) === -1) {
                return false;
            }
        }
        return true;
    }

    startingDate(form: NgForm) {
        this.startB = true;
        this.onSubmit(form);
    }

    finishingDate(form: NgForm) {
        this.finishD = this.finishings;
        this.finishB = true;
        this.onSubmit(form);
    }

}
