import {UniversityOrganisms} from './UniversityOrganisms';

export interface CentreFormation extends UniversityOrganisms {
    abreviation: string,
    region: string,
    domaines: string,
    reglement: string
}
