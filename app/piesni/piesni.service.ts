import { Injectable } from '@angular/core';
import { Piesn } from './piesn.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class PiesniService{
    idWybranejPiesni = new Subject<number>();
    piesniChanged = new Subject<Piesn[]>();

    private piesni: Piesn[] = [];

    addPiesn(nowaPiesn: Piesn){
        this.piesni.push(nowaPiesn);
        this.piesniChanged.next(this.piesni.slice());
        console.log('calosc_service');
        console.log(nowaPiesn);
        console.log('tylko nuty_service');
        console.log(nowaPiesn.nuty);

        console.log('calosc_service_slice');
        console.log(this.piesni);
        
    }

    getPiesni(){
        return this.piesni.slice();
    }

    getPiesn(index: number){
        return this.piesni[index];
    }

    updatePiesn(index: number, nowaPiesn: Piesn){
        this.piesni[index] = nowaPiesn;
        this.piesniChanged.next(this.piesni.slice());
    }

    setPiesni(piesni: Piesn[]){
        this.piesni = piesni;
        this.piesniChanged.next(this.piesni.slice());
    }

    setIdPiesni(index: number){
        this.idWybranejPiesni.next(index);
    }

    deletePiesn(index: number){
        this.piesni.splice(index,1);
        this.piesniChanged.next(this.piesni.slice());
    }
}