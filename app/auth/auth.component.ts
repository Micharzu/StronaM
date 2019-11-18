import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  zalogowano = false;
  error: string = null;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){

    if(!form.valid){
      return;
    }

    const email = form.value.login;
    const password = form.value.password;

    let authObservable: Observable<AuthResponseData>;

    authObservable = this.authService.logIn(email, password);
    
    authObservable.subscribe(resData => {
      console.log(resData);
      this.router.navigate(['/home']);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
    });

    form.reset();
  }

  ngOnDestroy(){

  }

}
