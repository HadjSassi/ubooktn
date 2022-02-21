import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../model/User';
import {DocumentService} from '../../../services/document.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {SettingsService} from '../../../services/settings.service';
import {Settings} from '../../../model/Settings';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {HttpErrorResponse} from '@angular/common/http';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormationService} from '../../../services/formation.service';
import {CertificationService} from '../../../services/certification.service';
import {CompetitionService} from '../../../services/competition.service';
import {JourneyService} from '../../../services/journey.service';
import {Formation} from '../../../model/Formation';
import {Competition} from '../../../model/Competition';
import {Journey} from '../../../model/Journey';
import {Certification} from '../../../model/Certification';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-content',
    template: `
        <div class="modal-header">
            <h5 class="modal-title text-center">Select the related University Organisms</h5>
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <app-background></app-background>
        </div>
        <div class="modal-footer">
            <div class="left-side">
                <button type="button" class="btn btn-default btn-link" (click)="activeModal.close('Close click')">Never mind</button>
            </div>
            <div class="divider"></div>
            <div class="right-side">
                <button type="button" class="btn btn-danger btn-link" (click)="activeModal.close('Close click')">DELETE</button>
            </div>
        </div>
    `
})
// tslint:disable-next-line:component-class-suffix
export class NgbdModalContentEvents {
    @Input() name;

    constructor(public activeModal: NgbActiveModal) {
    }
}

@Component({
    selector: 'app-new-event',
    templateUrl: './new-event.component.html',
    styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
    fileUploaded = false;
    fileIsUploading = false;
    fileUrl = '';
    matiere: string[] = [];
    niveau: string[] = [];
    annee: string[] = [];
    users: User[] = [];
    foulen: User;
    file: File = null; // Variable to store file
    isForma = true;
    isCertif = false;
    isComp = false;
    isJour = false;
    capacitySlider = 0;
    priceSlider = 0;
    startings: NgbDateStruct = {year: new Date().getUTCFullYear() - 2, month: 1, day: 1};
    startD: NgbDateStruct;
    startB = true;
    limitDate: NgbDateStruct;
    finishings: NgbDateStruct;
    finishD: NgbDateStruct = {year: new Date().getUTCFullYear() - 2, month: 1, day: 1};
    finishB = true;
    focus: any;
    themeList = '';
    themeT = [];
    themes = ['robotic', 'informatique', 'other', 'other1', 'other2', 'other3', 'other4', 'other5'];

    constructor(private settingsService: SettingsService,
                private formationService: FormationService,
                private certificationService: CertificationService,
                private competitionService: CompetitionService,
                private journeyService: JourneyService,
                private router: Router,
                private userService: UserService,
                private settingService: SettingsService,
                private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.settingService.getSettingsById(1).subscribe(
            (response: Settings) => {
                this.matiere = response.matiere.split(',');
                this.niveau = response.niveau.split(',');
                this.annee = response.annee.split(',');
                this.matiere.sort(
                    function (a, b) {
                        if (a > b) {
                            return 1;
                        } else if (a < b) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                );
                this.niveau.sort(
                    function (a, b) {
                        if (a > b) {
                            return 1;
                        } else if (a < b) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                );
                this.annee.sort(
                    function (a, b) {
                        if (a > b) {
                            return 1;
                        } else if (a < b) {
                            return -1;
                        } else {
                            return 0;
                        }
                    }
                );
            },
            error => {
                alert(error.message);
            }
        );
    }


    onSubmit(form: NgForm) {
        let uid = '';
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    uid = user.uid.toString();
                } else {
                    uid = 'dawa7';
                    console.log('dawa7 ha mbarka');
                }
            });
        const name = form.value['nom'];
        const address = form.value['address'];
        const email = form.value['email'];
        const tel = form.value['tel'];
        const registrationLink = form.value['link'];
        const eventPartenaires = form.value['associe'];
        const eventclubs = form.value['club'];
        const eventInstitus = form.value['institus'];
        const eventCfs = form.value['cfs'];
        const description = form.value['description'];
        const evenement: any = {
            nom: name,
            clubs: eventclubs,
            institus: eventInstitus,
            trainingCenters: eventCfs,
            affiche: this.fileUrl,
            themes: this.themeList,
            capacity: this.capacitySlider.toString(),
            address: address,
            email: email,
            tel: tel,
            registrationLink: registrationLink,
            description: description,
            price: this.priceSlider.toString(),
            partenaires: eventPartenaires,
            startingDate: this.startD.toString(),
            finishingDate: this.finishings.toString(),
            registrationDateLimit: this.limitDate.toString(),
            shown: 'false',
            picsUrl: '',
            uid: uid
        }
        switch (form.value['event']) {
            case 'forma' :
                this.formationService.addFormation(evenement).subscribe(
                    (response: Formation) => {
                        console.log(response);
                        this.router.navigate(['event']);

                        firebase.auth().onAuthStateChanged(
                            (users) => {
                                if (users) {
                                    uid = users.uid.toString();
                                    this.searchUid(uid);
                                } else {
                                    uid = 'dawa7';
                                    console.log('dawa7 ha mbarka');
                                }
                            }
                        );
                    },
                    (error: HttpErrorResponse) => {
                        alert(error.message);
                    }
                );
                break;
            case 'comp' :
                this.competitionService.addCompetition(evenement).subscribe(
                    (response: Competition) => {
                        console.log(response);
                        this.router.navigate(['event']);

                        firebase.auth().onAuthStateChanged(
                            (users) => {
                                if (users) {
                                    uid = users.uid.toString();
                                    this.searchUid(uid);
                                } else {
                                    uid = 'dawa7';
                                    console.log('dawa7 ha mbarka');
                                }
                            }
                        );
                    },
                    (error: HttpErrorResponse) => {
                        alert(error.message);
                    }
                );
                break;
            case 'jour' :
                this.journeyService.addJourney(evenement).subscribe(
                    (response: Journey) => {
                        console.log(response);
                        this.router.navigate(['event']);

                        firebase.auth().onAuthStateChanged(
                            (users) => {
                                if (users) {
                                    uid = users.uid.toString();
                                    this.searchUid(uid);
                                } else {
                                    uid = 'dawa7';
                                    console.log('dawa7 ha mbarka');
                                }
                            }
                        );
                    },
                    (error: HttpErrorResponse) => {
                        alert(error.message);
                    }
                );
                break;
            case 'certif' :
                this.certificationService.addCertification(evenement).subscribe(
                    (response: Certification) => {
                        console.log(response);
                        this.router.navigate(['event']);

                        firebase.auth().onAuthStateChanged(
                            (users) => {
                                if (users) {
                                    uid = users.uid.toString();
                                    this.searchUid(uid);
                                } else {
                                    uid = 'dawa7';
                                    console.log('dawa7 ha mbarka');
                                }
                            }
                        );
                    },
                    (error: HttpErrorResponse) => {
                        alert(error.message);
                    }
                );
                break;
            default:
                console.log('ha ezzedine barra dawa7 kima mbarka');
                break;
        }
    }


    searchUid(uid: string) {

        this.userService.getUsers().subscribe(
            (response: User[]) => {
                this.users = response;
                for (const i of this.users) {
                    if (i.uid === uid) {
                        this.foulen = i;
                        break;
                    }
                }
                this.foulen.score += 10;

                this.userService.updateUser(this.foulen).subscribe(
                    (responses: User) => {
                        console.log(responses);
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

    onUploadFile(file: File) {
        this.fileIsUploading = true;
        this.settingService.uploadFile(file).then(
            // @ts-ignore
            (url: string) => {
                this.fileUrl = url;
                this.fileIsUploading = false;
                this.fileUploaded = true;
            }
        );
    }

    detectFiles(event) {
        this.onUploadFile(event.target.files[0]);
    }

    verifLegnth(ch: string) {
        ch = ch.replace(/\s/g, '');
        return (ch.length <= 3);
    }

    startingDate() {
        this.startings = this.startD;
        this.startB = false;
    }

    finishingDate() {
        this.finishD = this.finishings;
        this.finishB = false;
    }

    test(ch: string) {
        if (this.themeT.indexOf(ch) === -1) {
            this.themeT.push(ch);
        } else {
            this.themeT.splice(this.themeT.indexOf(ch), 1);
        }
        if (this.themeT.length !== 0) {
            this.themeList = '';
            for (const x of this.themeT) {
                this.themeList += x + ',';
            }
        }
    }

    open() {
        const modalRef = this.modalService.open(NgbdModalContentEvents);
        modalRef.componentInstance.name = 'World';
    }
}
