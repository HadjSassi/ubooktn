import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CentreFormationService} from '../../services/centre-formation.service';
import {ClubService} from '../../services/club.service';
import {InstitusService} from '../../services/institus.service';
import {CentreFormation} from '../../model/CentreFormation';
import {Club} from '../../model/Clubs';
import {Institus} from '../../model/Institus';
import {SettingsService} from '../../services/settings.service';

@Component({
    selector: 'app-background',
    templateUrl: './background.component.html',
    styleUrls: ['./background.component.css']
})
export class BackgroundComponent implements OnInit {
    cf = [];
    clubs = [];
    institus = [];
    resultsCf: CentreFormation[] = [];
    resultsClub: Club[] = [];
    resultsInstitus: Institus[] = [];

    constructor(private cfService: CentreFormationService,
                private clubService: ClubService,
                private institusService: InstitusService,
                private settingService: SettingsService) {
    }

    ngOnInit(): void {
        this.clubs = [];
        this.cf = [];
        this.institus = [];
        this.cfService.getCentreFormations().subscribe(
            (result: CentreFormation[]) => {
                this.cf = result;
            }
        );
        this.clubService.getClubs().subscribe(
            (result: Club[]) => {
                this.clubs = result;
            }
        );
        this.institusService.getInstituss().subscribe(
            (result: Institus[]) => {
                this.institus = result;
            }
        );
    }

    search(key: any) {
        this.resultsCf = [];
        for (const doc of this.cf) {
            if (doc.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.abreviation.toLowerCase().indexOf(key.toLowerCase()) !== -1
            ) {
                this.resultsCf.push(doc);
            }
        }
        this.resultsClub = [];
        for (const doc of this.clubs) {
            if (doc.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
            ) {
                this.resultsClub.push(doc);
            }
        }
        this.resultsInstitus = [];
        for (const doc of this.institus) {
            if (doc.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
                || doc.abreviation.toLowerCase().indexOf(key.toLowerCase()) !== -1
            ) {
                this.resultsInstitus.push(doc);
            }
        }
        if (!key) {
            this.resultsCf = [];
            this.resultsClub = [];
            this.resultsInstitus = [];
        }
    }

    instituing(x: any) {
        this.resultsInstitus.splice(this.resultsInstitus.indexOf(x), 1);
        this.settingService.instituing(x);
    }

    clubing(x: any) {
        this.resultsClub.splice(this.resultsClub.indexOf(x), 1);
        this.settingService.clubing(x);
    }

    cfing(x: any) {
        this.resultsCf.splice(this.resultsCf.indexOf(x), 1);
        this.settingService.cfing(x);
    }
}
