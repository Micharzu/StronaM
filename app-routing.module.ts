import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PiesniComponent } from './piesni/piesni.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import { ListaPiesniComponent } from './piesni/lista-piesni/lista-piesni.component';
import { PiesniStartComponent } from './piesni/piesni-start/piesni-start.component';
import { PiesniDetailComponent } from './piesni/piesni-detail/piesni-detail.component';
import { EdytujPiesnComponent } from './piesni/edytuj-piesn/edytuj-piesn.component';
import { AuthComponent } from './auth/auth.component';
import { ZespolComponent } from './zespol/zespol.component';

const appRoutes: Routes =[
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'piesni', component: PiesniComponent, children:[
        {path: '', component: PiesniStartComponent},
        {path: 'nowa-piesn', component: EdytujPiesnComponent},
        {path: 'lista-piesni', component: ListaPiesniComponent},
        {path: ':id', component: PiesniDetailComponent},
        {path: ':id/edytuj-piesn', component: EdytujPiesnComponent}
    ]},
    {path: 'zespol-zak', component: ZespolComponent},
    {path: 'kontakt', component: KontaktComponent},
    {path: 'zaloguj', component: AuthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}