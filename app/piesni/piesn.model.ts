export class Piesn{
    public tytul: string;
    public autor: string;
    public nuty: boolean;
    public audio: boolean;

    constructor(tytul: string, autor:string, nuty: boolean, audio: boolean){
        this.tytul = tytul;
        this.autor = autor;
        if(nuty){
            this.nuty = nuty;
        }
        if(audio){
            this.audio = audio;
        }
    }
}