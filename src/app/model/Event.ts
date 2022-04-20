import {User} from './User';

export interface Event {
    id: number,
    nom: string,
    clubs: string,
    institus: string,
    trainingCenters: string,
    affiche: string,
    themes: string,
    capacity: string,
    address: string,
    email: string,
    tel: string,
    registrationLink: string,
    description: string,
    price: string,
    partenaires: string,
    startingDate: string,
    finishingDate: string,
    registrationDateLimit: string,
    shown: string,
    picsUrl: string,
    type: string,
    uid: User
}
