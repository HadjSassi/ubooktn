import {Settings} from './Settings';
import {User} from './User';

export interface Document {
    idDocument: number;
    nomDocument: string;
    typeDocument: string;
    settings: Settings;
    descriptionDocument: string;
    urlDocument: string;
    documentAssoscie: string;
    afficheDocument: string;
    uid: User;
}
