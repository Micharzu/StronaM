import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn: 'root'})

export class AuthService{
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
        private router: Router){}

    logIn(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA5G5MJxH6aF7NCYh0W0RAtVb4Np0sAhJM',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError),
        tap(resData=>{
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
            )})
        );
    } 

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An unknown error has occured!';
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'INVALID_PASSWORD':
                errorMessage = 'Hasło się nie zgadza';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Ten login nie wygląda znajomo';
                break;
        }
        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number){

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        //this.autoLogout(expiresIn * 1000);
        //localStorage.setItem('userData', JSON.stringify(user));
    }

    // logOut(){
    //     this.user.next(null);
    //     this.router.navigate(['/home']);
    //     localStorage.removeItem('userData');
    //     if(this.tokenExpirationTimer){
    //         clearTimeout(this.tokenExpirationTimer);
    //     }
    //     this.tokenExpirationTimer = null;
    // }

    // autoLogout(expirationDuration: number){
    //     this.tokenExpirationTimer = setTimeout(() => {
    //         this.logOut()
    //     }, expirationDuration);
    // }

}