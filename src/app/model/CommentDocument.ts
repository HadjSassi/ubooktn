import {User} from './User';
import {Document} from './Document';

export interface CommentDocument {
    idComment: number,
    comment: string,
    document: Document,
    user: User,
    timing: Date
}

