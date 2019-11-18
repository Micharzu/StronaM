import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Piesn } from '../piesni/piesn.model';

@Injectable({providedIn: 'root'})
export class FileUploadService{
    downloadURL: Observable<string>;
    promise: Promise<string>;
    proxyPath = 'https://cors-anywhere.herokuapp.com/';
    finalFilePath = '';
    i = 1;

    constructor(private http: HttpClient,
        private afs: AngularFireStorage){}

    uploadFile(wybranyPlik: File, tytul: string, autor: string, pdf: boolean){
        //let typPliku = '';
        let typPliku = '.mp3';
        if(pdf){
            typPliku = '.pdf';
        }
        const formData = new FormData();
        const path = tytul + '-' + autor + typPliku;
        formData.append('file', wybranyPlik, path);
        this.http.post('https://us-central1-stronam-723e5.cloudfunctions.net/uploadFile', formData,
        {
            reportProgress: true,
            observe: 'events'
        })
        .subscribe(event =>{
            if(event.type === HttpEventType.UploadProgress){
                console.log('Upload Progress: ' + Math.round(event.loaded/event.total * 100) + '%');
            } else if(event.type === HttpEventType.Response){
                console.log(event);
            }
        });
    }

    downloadFile(wybranaPiesn: Piesn, dotTyp: string):Observable<string>{
        const path = wybranaPiesn.tytul + '-' + wybranaPiesn.autor + dotTyp;
        const fileRef = this.afs.ref(path);
        return this.downloadURL = fileRef.getDownloadURL();
    }

    clearPath(){
        this.finalFilePath = '';
    }


    
}