import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EventService} from '../../../services/event.service';
import {ActivatedRoute} from '@angular/router';
import {Event} from '../../../model/Event';
import {saveAs} from 'file-saver';
import {join} from '@angular/compiler-cli/src/ngtsc/file_system';

@Component({
    selector: 'app-bookers',
    templateUrl: './bookers.component.html',
    styleUrls: ['./bookers.component.css']
})
export class BookersComponent implements OnInit {
    event: Event;
    id: number;
    uids: string[] = [];
    names: string[] = [];
    emails: string[] = [];
    reachedNumber: number;
    db = [];

    @ViewChild('table') public table: ElementRef;

    public moveTo(): void {
        this.table.nativeElement.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'start'});
    }

    constructor(private route: ActivatedRoute,
                private eventService: EventService) {
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.eventService.getEventById(this.id).subscribe(
            (result: Event) => {
                this.event = result;
                const parti = this.event.participants;
                const listParti = parti.split('},{');
                this.reachedNumber = listParti.length;
                for (const x of listParti) {
                    const xx = x.split(',');
                    let idd = xx[0];
                    if (idd[0] === '{') {
                        idd = idd.replace('{', '');
                    }
                    idd = idd.replace('UID:', '');
                    this.uids.push(idd);
                    idd = xx[1].replace('Name:', '') + ' ' + xx[2].replace('Prename:', '');
                    this.names.push(idd);
                    idd = xx[3];
                    if (idd[idd.length - 1] === '}') {
                        idd = idd.replace('}', '');
                    }
                    idd = idd.replace('Email:', '');
                    this.emails.push(idd);
                }
                this.prepareDb();
            }
        );
    }

    prepareDb(): void {
        // tslint:disable-next-line:forin
        for (const i in this.names) {
            const j = Number(i);
            // const ch = '{"BooKer Id":' + (j + 1) + ',"BooKer Name":"' + this.names[i] + '","BooKer Email":"' + this.emails[i] + '"}'
            const obbj = {
                'Booker Id': (j + 1),
                'Booker Name': this.names[i],
                'Booker Email': this.emails[i]
            }
            this.db.push(obbj);
        }
        console.log(this.db)
    }

    csv(): void {
        /*const headers = Object.keys(this.db[0]);
        const csv = [headers.join('\t')];
        this.db.forEach(function (data) {
            const row = [];
            headers.forEach(function (key) {
                row.push(data[key]);
            });
            csv.push(row.join('\t'));
        });
        const ccsv = csv.join('\n');*/
        const header = Object.keys(this.db[0]);
        const csv = this.db.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','));
        csv.unshift(header.join(','));
        const csvArray = csv.join('\r\n');
        const blob = new Blob([csvArray], {type: 'text/csv'})
        saveAs(blob, this.event.nom + ' BooKers.csv');
    }

    excel(): void {
    }

    json(): void {
    }

    xml(): void {
    }
}
