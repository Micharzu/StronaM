import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PiesniService } from './piesni.service';
import { Piesn } from './piesn.model';
import { map, take, exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService{
    constructor(private http: HttpClient,
        private piesniService: PiesniService,
        private authService: AuthService){}

    storePiesni(){
        const piesni = this.piesniService.getPiesni();
        console.log('store-piesni');
        
        console.log(piesni);
        // put might not work with other backends
        //return this.http.put('https://stronam-723e5.firebaseio.com/piesni.json', piesni);
        this.http.put<Piesn[]>('https://stronam-723e5.firebaseio.com/piesni.json', piesni).subscribe(response => {
            console.log('storing');
            console.log(piesni);
            
            console.log(response);       
        });
    }

    fetchPiesni(){
        this.http.get<Piesn[]>('https://stronam-723e5.firebaseio.com/piesni.json').pipe(map(piesni => {
            return piesni.map(piesni => {
                return {...piesni,
                    //nutyPath: piesni.nutyPath ? piesni.nutyPath : '',
                    //audioPath: piesni.audioPath ? piesni.audioPath: ''
                };
            });
        }))
        .subscribe(piesni =>{
            console.log('fetching');
            console.log(piesni);
            
            this.piesniService.setPiesni(piesni);
        })
    }

    // fetchPiesni(){        

    //     return this.authService.user.pipe(take(1), exhaustMap(user => {
    //             return this.http.get<Piesn[]>('https://stronam-723e5.firebaseio.com/piesni.json',
    //             {
    //                 params: new HttpParams().set('auth', user.token)
    //             });
    //         }),map(piesni => {
    //             return piesni.map(piesni => {
    //                 return {...piesni,
    //                     nutyPath: piesni.nutyPath ? piesni.nutyPath : '',
    //                     audioPath: piesni.audioPath ? piesni.audioPath: ''};
    //             });
    //         }),tap(piesni =>{
    //             console.log('fetching');
    //             console.log(piesni);
    //             this.piesniService.setPiesni(piesni);
    //         })
    //     );
    // }

}