import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user: firebase.User;
  authError: any;


  cartItems;
  condition1: boolean = true;
  condition2: boolean = false;

  name: string;
  email: string;
  mobNumber: string;
  town: string;
  address: string;
  payment: string;
  shipping: string;

  checkSecondStep: boolean;

  checkVal: boolean = false;
  checkNum: boolean;
  checkval: boolean;

  final: boolean;
  total;

  constructor(private firestore: AngularFirestore,
    private auth: AuthService,
    private router: Router) {
    this.getCartItem();
  }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });

  }

  public nextStep(): void {
    // let reg1 = /^((\+380)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
    let reg1 = /^\+?[3][8][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
    console.log(reg1.test('+38(980)-221-22-22'));

    console.log(
      this.user.displayName,
      this.user.email,
      this.mobNumber,
      this.town
    );
    if (this.user.displayName && this.user.email && this.town && this.mobNumber) {
      this.checkVal = false;
      if (reg1.test(this.mobNumber)) {
        console.log('wow');
        this.checkNum = false;
        this.checkSecondStep = true;
      } else {
        console.log('not wow');
        this.checkNum = true;
      }
    } else {
      this.checkVal = true;
    }
  }



  public previousStep() {
    this.checkSecondStep = false;
  }



  public completeOrder(): void {

    if (this.address && this.payment && this.shipping) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.final = true;
      localStorage.clear();
      this.checkval = false;
      const data = {
        name: this.user.displayName,
        email: this.user.email,
        mobNumber: this.mobNumber,
        town: this.town,
        address: this.address,
        payment: this.payment,
        shipping: this.shipping,
        order: this.cartItems,
        total: this.total
      };
      console.log(data);
      this.firestore.collection('orders').add(data);
    } else {
      this.checkval = true;
    }
  }




  createUser(frm) {
    this.auth.createUser(frm.value);
    this.router.navigate(['/checkout']);

  }

  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
    this.router.navigate(['/checkout']);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/checkout']);

  }




  public showCondition1(): void {
    this.condition1 = false;
    this.condition2 = true;

  }

  public showCondition2(): void {
    this.condition2 = false;
    this.condition1 = true;

  }

  public getCartItem(): void {
    let totalP:number = 0;
    if (localStorage.length > 0) {
      if (localStorage.getItem('myCard')) {
        this.cartItems = JSON.parse(localStorage.getItem('myCard'));
        console.log(this.cartItems);
        this.cartItems.forEach(val => {
          totalP += parseInt(val.quantity) * parseInt(val.price);
          this.total = totalP;
        })
      }
    }
  }
}
