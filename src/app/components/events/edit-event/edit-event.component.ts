import {Component, OnInit} from '@angular/core';
import {User} from '../../../model/User';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SettingsService} from '../../../services/settings.service';
import {EventService} from '../../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {NgForm} from '@angular/forms';
import * as firebase from 'firebase';
import {Event} from '../../../model/Event';
import {HttpErrorResponse, HttpEventType, HttpResponse} from '@angular/common/http';
import {NgbdModalContentEvents} from '../new-event/new-event.component';
import {InstitusService} from '../../../services/institus.service';
import {ClubService} from '../../../services/club.service';
import {CentreFormationService} from '../../../services/centre-formation.service';
import {Institus} from '../../../model/Institus';
import {Club} from '../../../model/Clubs';
import {CentreFormation} from '../../../model/CentreFormation';

@Component({
    selector: 'app-edit-event',
    templateUrl: './edit-event.component.html',
    styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
    fileUploaded = false;
    fileIsUploading = false;
    fileUrl = '';
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
    isCompetition = false;
    isFormation = true;
    isCertification = false;
    isJourney = false;
    event: any;

    constructor(private settingsService: SettingsService,
                private eventService: EventService,
                private userService: UserService,
                private settingService: SettingsService,
                private modalService: NgbModal,
                private route: ActivatedRoute,
                private router: Router,
                private instituService: InstitusService,
                private clubService: ClubService,
                private cfService: CentreFormationService) {
    }

    ngOnInit(): void {
        const id = this.route.snapshot.params['id'];
        const type = this.route.snapshot.params['type'];
        console.log(type);
        switch (type) {
            case 'journey' :
                this.isJourney = true;
                this.eventService.getEventById(id).subscribe(
                    (result: Event) => {
                        this.event = result;
                        firebase.auth().onAuthStateChanged(
                            (user) => {
                                if (user.uid !== this.event.uid) {
                                    console.log(user.uid);
                                    console.log(this.event.uid);
                                    this.router.navigate(['/event']);
                                }
                            }
                        );
                        let d = new Date(result.startingDate);
                        this.startD = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        d = new Date(result.registrationDateLimit);
                        this.limitDate = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        d = new Date(result.finishingDate);
                        this.finishings = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        this.instituService.getInstituss().subscribe(
                            (res: Institus[]) => {
                                for (const x of res) {
                                    if (result.institus.indexOf(x.id.toString()) !== -1) {
                                        this.instituing.push(x);
                                    }
                                }
                            }
                        );
                        this.clubService.getClubs().subscribe(
                            (res: Club[]) => {
                                for (const x of res) {
                                    if (result.clubs.indexOf(x.id.toString()) !== -1) {
                                        this.clubing.push(x);
                                    }
                                }
                            }
                        );
                        this.cfService.getCentreFormations().subscribe(
                            (res: CentreFormation[]) => {
                                for (const x of res) {
                                    if (result.trainingCenters.indexOf(x.id.toString()) !== -1) {
                                        this.cfing.push(x);
                                    }
                                }
                            }
                        );
                    }
                );
                break;
            case 'competition':
                this.isCompetition = true;
                this.eventService.getEventById(id).subscribe(
                    (result: Event) => {
                        this.event = result;
                        firebase.auth().onAuthStateChanged(
                            (user) => {
                                if (user.uid !== this.event.uid) {
                                    console.log(user.uid);
                                    console.log(this.event.uid);
                                    this.router.navigate(['/event']);
                                }
                            }
                        );
                        let d = new Date(result.startingDate);
                        this.startD = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        d = new Date(result.registrationDateLimit);
                        this.limitDate = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        d = new Date(result.finishingDate);
                        this.finishings = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        this.instituService.getInstituss().subscribe(
                            (res: Institus[]) => {
                                for (const x of res) {
                                    if (result.institus.indexOf(x.id.toString()) !== -1) {
                                        this.instituing.push(x);
                                    }
                                }
                            }
                        );
                        this.clubService.getClubs().subscribe(
                            (res: Club[]) => {
                                for (const x of res) {
                                    if (result.clubs.indexOf(x.id.toString()) !== -1) {
                                        this.clubing.push(x);
                                    }
                                }
                            }
                        );
                        this.cfService.getCentreFormations().subscribe(
                            (res: CentreFormation[]) => {
                                for (const x of res) {
                                    if (result.trainingCenters.indexOf(x.id.toString()) !== -1) {
                                        this.cfing.push(x);
                                    }
                                }
                            }
                        );
                        console.log(result.themes);
                        const tt = result.themes.split(',');
                        for (const t of tt) {
                            this.themeT.push(t);
                        }
                    }
                );
                break;
            case 'certifications':
                console.log('certification here we are !');
                this.isCertification = true;
                this.eventService.getEventById(id).subscribe(
                    (result: Event) => {
                        this.event = result;
                        firebase.auth().onAuthStateChanged(
                            (user) => {
                                if (user.uid !== this.event.uid) {
                                    console.log(user.uid);
                                    console.log(this.event.uid);
                                    this.router.navigate(['/event']);
                                }
                            }
                        );
                        let d = new Date(result.startingDate);
                        this.startD = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        d = new Date(result.registrationDateLimit);
                        this.limitDate = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        d = new Date(result.finishingDate);
                        this.finishings = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        this.instituService.getInstituss().subscribe(
                            (res: Institus[]) => {
                                for (const x of res) {
                                    if (result.institus.indexOf(x.id.toString()) !== -1) {
                                        this.instituing.push(x);
                                    }
                                }
                            }
                        );
                        this.clubService.getClubs().subscribe(
                            (res: Club[]) => {
                                for (const x of res) {
                                    if (result.clubs.indexOf(x.id.toString()) !== -1) {
                                        this.clubing.push(x);
                                    }
                                }
                            }
                        );
                        this.cfService.getCentreFormations().subscribe(
                            (res: CentreFormation[]) => {
                                for (const x of res) {
                                    if (result.trainingCenters.indexOf(x.id.toString()) !== -1) {
                                        this.cfing.push(x);
                                    }
                                }
                            }
                        );
                    }
                );
                break;
            case 'training':
                this.isFormation = true;
                this.eventService.getEventById(id).subscribe(
                    (result: Event) => {
                        this.event = result;
                        firebase.auth().onAuthStateChanged(
                            (user) => {
                                if (user.uid !== this.event.uid) {
                                    console.log(user.uid);
                                    console.log(this.event.uid);
                                    this.router.navigate(['/event']);
                                }
                            }
                        );
                        let d = new Date(result.startingDate);
                        this.startD = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        d = new Date(result.registrationDateLimit);
                        this.limitDate = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        d = new Date(result.finishingDate);
                        this.finishings = {day: d.getDate(), month: d.getMonth() + 1, year: d.getUTCFullYear()};
                        this.instituService.getInstituss().subscribe(
                            (res: Institus[]) => {
                                for (const x of res) {
                                    if (result.institus.indexOf(x.id.toString()) !== -1) {
                                        this.instituing.push(x);
                                    }
                                }
                            }
                        );
                        this.clubService.getClubs().subscribe(
                            (res: Club[]) => {
                                for (const x of res) {
                                    if (result.clubs.indexOf(x.id.toString()) !== -1) {
                                        this.clubing.push(x);
                                    }
                                }
                            }
                        );
                        this.cfService.getCentreFormations().subscribe(
                            (res: CentreFormation[]) => {
                                for (const x of res) {
                                    if (result.trainingCenters.indexOf(x.id.toString()) !== -1) {
                                        this.cfing.push(x);
                                    }
                                }
                            }
                        );
                    }
                );
                break
        }
    }

    onSubmit(form: NgForm) {
        const id = this.route.snapshot.params['id'];
        const type = this.route.snapshot.params['type'];
        if (this.ready) {
            if (this.fileUrl.length !== 0) {
                this.event.affiche = this.fileUrl;
            }
            if (this.themeList.length !== 0) {
                this.event.themes = this.themeList;
            }
            let eventclubs = '';
            let eventInstitus = '';
            let eventCfs = '';
            if (this.instituing.length !== 0) {
                for (const x of this.instituing) {
                    eventInstitus += x.id + ',';
                }
                eventInstitus = eventInstitus.substring(0, (eventInstitus.length - 1));
                this.event.institus = eventInstitus;
            }
            if (this.clubing.length !== 0) {
                for (const x of this.clubing) {
                    eventclubs += x.id + ',';
                }
                eventclubs = eventclubs.substring(0, (eventclubs.length - 1));
                this.event.clubs = eventclubs;
            }
            if (this.cfing.length !== 0) {
                for (const x of this.cfing) {
                    eventCfs += x.id + ',';
                }
                eventCfs = eventCfs.substring(0, (eventCfs.length - 1));
                this.event.trainingCenters = eventCfs;
            }
            if (!this.startB) {
                this.event.startingDate = this.dating(this.startD);
            }
            if (!this.finishB) {
                this.event.finishingDate = this.dating(this.finishings);
            }
            if (!this.limitB) {
                this.event.registrationDateLimit = this.dating(this.limitDate);
            }
            switch (type) {
                case 'journey':
                    this.eventService.updateEvent(this.event).subscribe(
                        (result: Event) => {
                            console.log(result);
                            this.router.navigate(['/event', 'journey', id]);
                        }, error => {
                            console.log(error);
                        }
                    );
                    break;
                case 'competition':
                    this.eventService.updateEvent(this.event).subscribe(
                        (result: Event) => {
                            console.log(result);
                            this.router.navigate(['/event', 'competitions', id]);
                        }, error => {
                            console.log(error);
                        }
                    );
                    break;
                case 'certification':
                    this.eventService.updateEvent(this.event).subscribe(
                        (result: Event) => {
                            console.log(result);
                            this.router.navigate(['/event', 'certifications', id]);
                        }, error => {
                            console.log(error);
                        }
                    );
                    break;
                case 'training':
                    this.eventService.updateEvent(this.event).subscribe(
                        (result: Event) => {
                            console.log(result);
                            this.router.navigate(['/event', 'training', id]);
                        }, error => {
                            console.log(error);
                        }
                    );
                    break;
            }
        }
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

    supprim() {
        const id = this.route.snapshot.params['id'];
        const txt = 'Are you sure to delete ' + this.event.nom;
        if (confirm(txt)) {
            this.eventService.deleteEvent(id).subscribe();
            this.router.navigate(['/event']);
        } else {
            console.log('Nothing happened !')
        }

    }
}
