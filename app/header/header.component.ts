import { Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  zalogowano = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user =>{
      this.zalogowano = !!user;
    });
  }

  ngOnDestroy(){
    this.userSub.unsubscribe();
  }
}