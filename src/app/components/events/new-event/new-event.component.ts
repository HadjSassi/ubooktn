import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../model/User';
import {DocumentService} from '../../../services/document.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {SettingsService} from '../../../services/settings.service';
import {Settings} from '../../../model/Settings';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {EventService} from '../../../services/event.service';
import {Event} from '../../../model/Event';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-content',
    template: `
        <style>
            .modal-content {
                position: relative;
                display: flex;
                flex-direction: column;
                width: 100%;
                pointer-events: auto;
                background-color: white;
                background-clip: padding-box;
                border: 1px solid rgba(0, 0, 0, .2);
                border-radius: 0.3rem;
                outline: 0;
            }
        </style>
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-center">Select the related University Organisms</h5>
            </div>
            <div class="modal-body">
                <app-background></app-background>
            </div>
            <div class="modal-footer">
                <div class="left-side">
                    <button type="button" class="btn btn-danger btn-link" (click)="activeModal.close('Close click')">Cancel</button>
                </div>
                <div class="divider"></div>
                <div class="right-side">
                    <button type="button" class="btn btn-default btn-link" (click)="bye()">Accept</button>
                </div>
            </div>
        </div>
    `
})
// tslint:disable-next-line:component-class-suffix
export class NgbdModalContentEvents {
    closed = false;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();

    constructor(public activeModal: NgbActiveModal) {
    }

    bye() {
        this.closed = true;
        this.activeModal.close('Close click');
        this.passEntry.emit();
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
    capacitySlider = 5000;
    priceSlider = 0;
    startings: NgbDateStruct = {year: new Date().getUTCFullYear() - 2, month: 1, day: 1};
    startD: NgbDateStruct;
    startB = true;
    limitDate: NgbDateStruct;
    finishings: NgbDateStruct;
    finishD: NgbDateStruct = {year: new Date().getUTCFullYear() - 2, month: 1, day: 1};
    finishB = true;
    limitB = true;
    focus: any;
    themeList = '';
    themeT = [];
    themes = this.settingService.themes;
    instituing = [];
    clubing = [];
    cfing = [];
    ready = true;
    submited = false;
    noBooking = true;

    constructor(private settingsService: SettingsService,
                private eventService: EventService,
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
            }
        );
        firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    this.userService.getUserByUid(user.uid).subscribe(
                        (uss: User) => {
                            this.foulen = uss;
                        }
                    );
                }
            });
    }

    onSubmit(form: NgForm) {
        if (this.ready) {
            this.submited = true;
            let uid = '';
            const name = form.value['nom'];
            const address = form.value['address'];
            const email = form.value['email'];
            const tel = form.value['tel'];
            const registrationLink = form.value['link'];
            const eventPartenaires = form.value['associe'];
            const eventType = form.value['event'];
            let eventclubs = '';
            let eventInstitus = '';
            let eventCfs = '';
            const description = form.value['description'];
            if (this.instituing.length !== 0) {
                for (const x of this.instituing) {
                    eventInstitus += x.id + ',';
                }
                eventInstitus = eventInstitus.substring(0, (eventInstitus.length - 1));
            }
            if (this.clubing.length !== 0) {
                for (const x of this.clubing) {
                    eventclubs += x.id + ',';
                }
                eventclubs = eventclubs.substring(0, (eventclubs.length - 1));
            }
            if (this.cfing.length !== 0) {
                for (const x of this.cfing) {
                    eventCfs += x.id + ',';
                }
                eventCfs = eventCfs.substring(0, (eventCfs.length - 1));
            }
            firebase.auth().onAuthStateChanged(
                (user) => {
                    if (user) {
                        uid = user.uid.toString();
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
                            startingDate: this.dating(this.startD),
                            finishingDate: this.dating(this.finishings),
                            registrationDateLimit: this.dating(this.limitDate),
                            shown: 'false',
                            picsUrl: '',
                            type: eventType,
                            uid: this.foulen
                        }
                        this.eventService.addEvent(evenement).subscribe(
                            (reeesp: Event) => {
                                this.router.navigate(['event']);
                                this.searchUid(this.foulen.uid);
                            }
                        )
                    }
                });
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
        this.settingService.uploadFile(file).subscribe(
            event => {
                if (event.type === HttpEventType.UploadProgress) {
                    console.log('file still');
                } else if (event instanceof HttpResponse) {
                    console.log('File success');
                    this.fileUrl = 'assets/Storage/Event/' + file.name;
                    console.log(this.fileUrl)
                    this.fileIsUploading = false;
                    this.fileUploaded = true;
                }
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

    limitingDate() {
        this.limitB = false;
    }

    themeing(ch: string) {
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
        } else {
            this.themeList = '';
        }
        console.log(this.themeList);
    }

    open() {
        this.ready = false;
        this.settingService.resetOrganisms();
        const modalRef = this.modalService.open(NgbdModalContentEvents);
        modalRef.componentInstance.passEntry.subscribe(() => {
            this.updateOrganisms();
            this.ready = true;
        })
    }

    updateOrganisms() {
        this.instituing = this.settingService.getInstituing();
        this.clubing = this.settingService.getClubing();
        this.cfing = this.settingService.getCfing();
    }

    closeInstitus(c: any) {
        console.log(c.nom);
        this.instituing.splice(this.instituing.indexOf(c), 1);
    }

    closeClub(c: any) {
        console.log(c.nom);
        this.clubing.splice(this.clubing.indexOf(c), 1);
    }

    closeCf(c: any) {
        console.log(c.nom);
        this.cfing.splice(this.cfing.indexOf(c), 1);
    }

    dating(d: NgbDateStruct) {
        return '' + d.month + '/' + d.day + '/' + d.year;
    }

    booking() {
        this.noBooking = !this.noBooking;
    }
}
