import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm, FormControl } from '@angular/forms';
import { Piesn } from '../piesn.model';
import { PiesniService } from '../piesni.service';
import { FileUploadService } from 'src/app/file-upload/file-upload.service';

@Component({
  selector: 'app-edytuj-piesn',
  templateUrl: './edytuj-piesn.component.html',
  styleUrls: ['./edytuj-piesn.component.css']
})
export class EdytujPiesnComponent implements OnInit {
  @ViewChild('f', {static: true}) formularz: NgForm;
  trybEdycji = false;
  id: number;
  piesn: Piesn;
  dodajNuty = false;
  dodajAudio = false;
  subskrypcja: Subscription;
  wybranyPdf: File = null;
  wybraneAudio: File = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private piesniService: PiesniService,
    private uploadService: FileUploadService) { }

  ngOnInit() {
    this.subskrypcja = this.route.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.trybEdycji = params['id'] != null;
    })
    this.subskrypcja.unsubscribe();
    this.formSetup();
  }
  
  onNutySelected(event){
    this.wybranyPdf = event.target.files[0];
    if(this.wybranyPdf.name.slice(-3)!=='pdf'){
      console.log('To nie jest plik pdf!');
      this.wybranyPdf = null;
    }
  }

  onAudioSelected(event){
    this.wybraneAudio = event.target.files[0];
    if(this.wybraneAudio.name.slice(-3)!=='mp3'){
      console.log('To nie jest plik mp3!');
      this.wybranyPdf = null;
    }
  }

  //needs guard
  onSubmit(f: NgForm){
    const value = f.value;
    const pdf: boolean = !!this.wybranyPdf;
    const audio = !!this.wybraneAudio;
    const nowaPiesn = new Piesn(value.tytul, value.autor, pdf, audio);
    if(this.trybEdycji){
      this.piesniService.updatePiesn(this.id, nowaPiesn);
    } else{
      this.piesniService.addPiesn(nowaPiesn);
    }
    if(pdf){
      this.uploadService.uploadFile(this.wybranyPdf, value.tytul, value.autor, true);
    }
    if(audio){
      this.uploadService.uploadFile(this.wybraneAudio, value.tytul, value.autor, false);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private formSetup(){
    let piesnTytul = '';
    let piesnAutor = '';
    // nuty
    // audio

    if(this.trybEdycji){
      this.piesn = this.piesniService.getPiesn(this.id);
      piesnTytul = this.piesn.tytul;
      piesnAutor = this.piesn.autor;
    }
    
    setTimeout(() => {
      this.formularz.form.setValue({
        tytul : piesnTytul,
        autor : piesnAutor
      });
    },);
  }

  onDodajNuty(){
    this.dodajNuty = true;

  }

  onDodajAudio(){
    this.dodajAudio = true;
  }

  // needs guard
  onDelete(){
    this.piesniService.deletePiesn(this.id);
    this.router.navigate(['../..'], {relativeTo: this.route});
  }
}
