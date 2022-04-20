import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Settings} from '../model/Settings';
import * as firebase from 'firebase';
import {InstitusService} from './institus.service';
import {ClubService} from './club.service';
import {CentreFormationService} from './centre-formation.service';
import {Institus} from '../model/Institus';
import {Club} from '../model/Clubs';
import {CentreFormation} from '../model/CentreFormation';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private apiServeurUrl = environment.apiBaseUrl;
    private institus = [];
    private clubs = [];
    private cfs = [];
    public listInstitus = [];
    public listClubs = [];
    public listCfs = [];
    public themes = ['Computer Sciences', 'Robotic', 'Entrepreneurship', 'Literature',
        'Soft Skills', 'Chemistry', 'Physics', 'Mathematics', 'Sciences', 'Other', 'Philosophy', 'Human Sciences',
        'Politics', 'Management', 'Technology', 'Mechanics', 'Religious', 'Sports', 'Games', 'Musics', 'Arts'
        , 'Cinema', 'Multimedia'].sort();

    constructor(private http: HttpClient,
                private institusService: InstitusService,
                private clubService: ClubService,
                private cfService: CentreFormationService) {
    }

    public getSettingss(): Observable<Settings[]> {
        return this.http.get<Settings[]>(`${this.apiServeurUrl}/settings/all`);
    }

    getSettingsById(id: number): Observable<Settings> {
        return this.http.get<Settings>(`${this.apiServeurUrl}/settings/find/${id}`);
    }

    getSettingsByData(anee: string, mati: string, niv: string): Observable<Settings> {
        return this.http.get<Settings>(`${this.apiServeurUrl}/settings/findData/${anee}&${mati}&${niv}`);
    }

    public addSettings(settings: Settings): Observable<Settings> {
        return this.http.post<Settings>(`${this.apiServeurUrl}/settings/add`, settings);
    }

    public updateSettings(settings: Settings): Observable<Settings> {
        return this.http.put<Settings>(`${this.apiServeurUrl}/settings/update`, settings);
    }

    uploadFile(file: File): Observable<HttpEvent<{}>> {
        const data: FormData = new FormData();
        data.append('file', file);
        const newRequest = new HttpRequest('POST', 'http://localhost:8081/upload/Event', data, {
            reportProgress: true,
            responseType: 'text'
        });
        return this.http.request(newRequest);
    }

    instituing(x: any) {
        this.institus.push(x);
    }

    clubing(x: any) {
        this.clubs.push(x);
    }

    cfing(x: any) {
        this.cfs.push(x);
    }

    getInstituing(): any[] {
        return this.institus;
    }

    getClubing(): any[] {
        return this.clubs;
    }

    getCfing(): any[] {
        return this.cfs;
    }

    resetOrganisms() {
        this.cfs = [];
        this.clubs = [];
        this.institus = [];
    }

    getAllOrganisms() {
        this.institusService.getInstituss().subscribe(
            (result: Institus[]) => {
                this.listInstitus = result;
            }, error => {
                console.log(error);
            }
        );
        let i: any = {
            idInstitus: 0,
            nomInstitus: '',
            abreviation: '',
            universite: '',
            region: '',
            historique: '',
            filieres: '',
            logo: '',
            urlOfficel: '',
            listInstitus: '',
            picUrl: '',
            urls: '',
            sexe: '',
            type: '',
            nbChambre: '',
            reglement: '',
            listClubs: '',
            voirAussi: ''
        };
        this.listInstitus.push(i);
        this.clubService.getClubs().subscribe(
            (result: Club[]) => {
                this.listClubs = result;
            }, error => {
                console.log(error);
            }
        );
        i = {
            idClub: 0,
            nomClub: '',
            domaine: '',
            historique: '',
            picUrl: '',
            urls: '',
            logo: '',
            urlOfficel: '',
            listClubs: '',
            listInstitus: ''
        };
        this.listClubs.push(i);
        this.cfService.getCentreFormations().subscribe(
            (result: CentreFormation[]) => {
                this.listCfs = result;
            }, error => {
                console.log(error);
            }
        );
        i = {
            idCf: 0,
            nomCf: '',
            abreviation: '',
            region: '',
            historique: '',
            domaines: '',
            reglement: '',
            logo: '',
            urlOfficiel: '',
            urlClubs: '',
            urlPartenaires: '',
            urlInstitus: '',
            picsUrls: ''
        };
        this.listCfs.push(i);
    }

}
