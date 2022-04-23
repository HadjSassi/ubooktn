import {UniversityOrganisms} from './UniversityOrganisms';

export interface Institus extends UniversityOrganisms {
    abreviation: string,
    universite: string,
    region: string,
    filieres: string,
    sexe: string,
    type: string,
    nbChambre: string,
    reglement: string
}
