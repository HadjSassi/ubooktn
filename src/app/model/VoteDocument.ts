import {Document} from './Document';
import {User} from './User';

export interface VoteDocument {
    voteId: number,
    voteType: number,
    document: Document,
    user: User
}
