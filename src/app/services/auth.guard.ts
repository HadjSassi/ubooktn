import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {UserService} from './user.service';
import {User} from '../model/User';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private router: Router,
                private userService: UserService) {

    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve, reject) => {
                firebase.auth().onAuthStateChanged(
                    (user) => {
                        if (user) {
                            if (this.userService.getUserByUid(user.uid).subscribe(
                                (response: User) => {
                                    if (response['enabled'] === true) {
                                        resolve(true);
                                    } else {
                                        this.router.navigate(['/confirmation']);
                                    }
                                }, error => {
                                    this.router.navigate(['/auth/signup']);
                                    resolve(false);
                                    alert(error.message);
                                }
                            )) {
                            }
                        } else {
                            this.router.navigate(['/auth/signup']);
                            resolve(false);
                        }
                    }
                );
            }
        );

    }


}
