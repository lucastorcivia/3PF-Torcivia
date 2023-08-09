import { Component } from '@angular/core';
import { User } from '../users/models';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.services';
import { Store } from '@ngrx/store';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public todayDate : Date = new Date();
  public authUser$: Observable<User | null>;

  constructor(private authService: AuthService, private store: Store) {
    this.authUser$ = this.store.select(selectAuthUser);
  }
}
