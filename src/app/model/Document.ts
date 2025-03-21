import {Settings} from './Settings';
import {User} from './User';

export interface Document {
    idDocument: number;
    nomDocument: string;
    typeDocument: string;
    settings: Settings;
    descriptionDocument: string;
    creative: string;
    urlDocument: string;
    documentAssoscie: string;
    veracity: string;
    afficheDocument: string;
    uid: User;
}
