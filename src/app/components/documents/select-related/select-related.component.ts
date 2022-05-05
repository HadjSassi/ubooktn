import {Component, OnInit} from '@angular/core';
import {CentreFormation} from '../../../model/CentreFormation';
import {Club} from '../../../model/Clubs';
import {Institus} from '../../../model/Institus';
import {CentreFormationService} from '../../../services/centre-formation.service';
import {ClubService} from '../../../services/club.service';
import {InstitusService} from '../../../services/institus.service';
import {SettingsService} from '../../../services/settings.service';
import {Document} from '../../../model/Document';
import {DocumentService} from '../../../services/document.service';

@Component({
  selector: 'app-select-related',
  templateUrl: './select-related.component.html',
  styleUrls: ['./select-related.component.css']
})
export class SelectRelatedComponent implements OnInit {
  cf = [];
  resultsCf: Document[] = [];


  constructor(private cfService: DocumentService,
              private settingService: SettingsService) {
  }

  ngOnInit(): void {
    this.cf = [];
    this.cfService.getDocuments().subscribe(
        (result: Document[]) => {
          this.cf = result;
        }
    );
  }

  search(key: any) {
    this.resultsCf = [];
    for (const doc of this.cf) {
      if (doc.nomDocument.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || doc.typeDocument.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || doc.settings.matiere.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || doc.settings.niveau.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        this.resultsCf.push(doc);
      }
    }
    if (!key) {
      this.resultsCf = [];
    }
  }

  cfing(x: any) {
    this.resultsCf.splice(this.resultsCf.indexOf(x), 1);
    this.settingService.documenting(x);
  }

}
