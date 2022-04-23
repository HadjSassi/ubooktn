import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../services/settings.service';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

    constructor(private settingsService: SettingsService) {
    }

    ngOnInit(): void {
        this.settingsService.getAllOrganisms();
    }

}
