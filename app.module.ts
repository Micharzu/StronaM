import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import 'hammerjs';
import { NgxAudioPlayerModule } from 'ngx-audio-player';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PiesniComponent } from './piesni/piesni.component';
import { HomeComponent } from './home/home.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { AppRoutingModule } from './app-routing.module';
import { ListaPiesniComponent } from './piesni/lista-piesni/lista-piesni.component';
import { PojedynczaPiesnComponent } from './piesni/lista-piesni/pojedyncza-piesn/pojedyncza-piesn.component';
import { PiesniStartComponent } from './piesni/piesni-start/piesni-start.component';
import { PiesniDetailComponent } from './piesni/piesni-detail/piesni-detail.component';
import { AuthComponent } from './auth/auth.component';
import { EdytujPiesnComponent } from './piesni/edytuj-piesn/edytuj-piesn.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { ZespolComponent } from './zespol/zespol.component'
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PiesniComponent,
    HomeComponent,
    KontaktComponent,
    ListaPiesniComponent,
    PojedynczaPiesnComponent,
    PiesniStartComponent,
    PiesniDetailComponent,
    AuthComponent,
    EdytujPiesnComponent,
    FileUploadComponent,
    PdfViewerComponent,
    ZespolComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    PdfViewerModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    BrowserAnimationsModule,
    NgxAudioPlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
