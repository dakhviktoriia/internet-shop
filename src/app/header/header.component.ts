import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ForumService } from '../shared/services/forum.service';
import {Observable} from 'rxjs';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;

  constructor(private auth: AuthService,
              private forumServise: ForumService) {
  }

  authError: any;
  name: string;
  email: string;
  password: string;

  checkLog: boolean;

  user: firebase.User;

  cartItems = [];
  qua: number;

  activeCond: boolean;

  ngOnInit() {

    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });
    console.log(this.checkLog);
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });

    this.getCartItem();
  }


  public getCartItem(): void {
    if (localStorage.length > 0) {
      if (localStorage.getItem('myCard')) {
        this.cartItems = JSON.parse(localStorage.getItem('myCard'));
        this.qua = this.cartItems.length;
        console.log(this.cartItems);
      }
    }
  }

  createUser(frm) {
    this.auth.createUser(frm.value);
    // frm.reset();
  }

  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
    frm.reset();
    // this.closeMod();

  }
  public closeMod(): void {
    this.closeModal.nativeElement.click();
}


  logout() {
    this.auth.logout();
  }

}
