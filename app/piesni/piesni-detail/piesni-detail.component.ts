import { Component, OnInit, OnDestroy } from '@angular/core';
import { Piesn } from '../piesn.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PiesniService } from '../piesni.service';
import { FileUploadService } from 'src/app/file-upload/file-upload.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-piesni-detail',
  templateUrl: './piesni-detail.component.html',
  styleUrls: ['./piesni-detail.component.css']
})
export class PiesniDetailComponent implements OnInit, OnDestroy {
  piesn: Piesn;
  idPiesni: number;

  mp3 = '';
  isMP3 = false;

  pdf = '';
  isPDF = false;

  isLoading = false;

  wyswietlTytul = true;
  wyswietlMikserGlosnosci = true;

  subNuty: Subscription;
  subAudio: Subscription;

  constructor(private route: ActivatedRoute,
    private piesnService: PiesniService,
    private uploadService: FileUploadService) { }

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {
        this.idPiesni = +params['id'];
        this.piesn = this.piesnService.getPiesn(this.idPiesni);

        this.clearPath();

        console.log(this.piesn);
        
        if(this.piesn.nuty){
          this.isLoading = true;

          this.subNuty = this.uploadService.downloadFile(this.piesn, '.pdf').subscribe((data)=>{
            this.isLoading = false;
            console.log(data);
            this.pdf = this.uploadService.proxyPath + data;
            
            this.isPDF = true;
          });

        }

        if(this.piesn.audio){
          this.isLoading = true;

          this.subNuty = this.uploadService.downloadFile(this.piesn, '.mp3').subscribe((data)=>{
            this.isLoading = false;
            console.log(data);
            this.mp3 = data;
            
            this.isMP3 = true;
          });

        }

        this.piesnService.setIdPiesni(this.idPiesni);
      }
    );
  }

  clearPath(){
    this.isPDF = false;
    this.pdf = '';
    this.isMP3 = false;
    this.mp3 = '';
  }

  ngOnDestroy(){
    this.subNuty.unsubscribe();
    this.subAudio.unsubscribe();
    
  }

}
