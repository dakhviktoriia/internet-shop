import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/shared/services/forum.service';
import { IProduct } from 'src/app/shared/interfaces/home.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Array<Object> = [];
  items;
  quantity: number;
  sum: number;

  checkEmpty: boolean;

  total;
  constructor() {
    // this.getCartItem();
    // this.checking();
  }

  ngOnInit() {

  }


  // public checking(): void {
  //   if (this.cartItems.length === 0) {
  //     this.checkEmpty = true;
  //   } else {
  //     this.checkEmpty = false;
  //   }
  // }


  // public getCartItem(): void {
  //   let totalP = 0;
  //   if (localStorage.length > 0) {
  //     if (localStorage.getItem('myCard')) {
  //       this.cartItems = JSON.parse(localStorage.getItem('myCard'));
  //       console.log(this.cartItems);
  //       this.cartItems.forEach(val => {
  //         totalP += parseInt(val.quantity) * parseInt(val.price);
  //         this.total = totalP;
  //       })
  //     }
  //   }

  // }

  // public removeItem(item): void {
  //   let totalP = 0;
  //   this.cartItems.splice(this.cartItems.indexOf(item), 1);
  //   localStorage.setItem('myCard', JSON.stringify(this.cartItems));
  //   this.cartItems.forEach(val => {
  //     totalP += parseInt(val.quantity) * parseInt(val.price);
  //     this.total = totalP;
  //   })
  //   if (this.cartItems.length === 0) {
  //     this.checkEmpty = true;
  //   }
  // }


  // public checkOut() {
  //   console.log('check out');
  //   console.log(this.cartItems);
  //   localStorage.setItem('myCard', JSON.stringify(this.cartItems));

  // }

  // public counterMinus(id): void {
  //   console.log(id);
  //   let totalP: number = 0;
  //   this.cartItems = JSON.parse(localStorage.getItem('myCard'));
  //   console.log(this.cartItems);
  //   this.cartItems.forEach((val, i, arr) => {
  //     console.log(val.id);
  //     if (val.id === id) {
  //       let count = parseInt(arr[i].quantity);
  //       if (count > 1) {
  //         count--;
  //         arr[i].quantity = count;
  //         console.log(count);
  //       }
  //     }
  //     totalP += parseInt(val.quantity) * parseInt(val.price);
  //     console.log(totalP);
  //     this.total = totalP;

  //   });
  //   localStorage.setItem('myCard', JSON.stringify(this.cartItems));
  // }

  // public counterPlus(id): void {
  //   let totalP: number = 0;
  //   this.cartItems = JSON.parse(localStorage.getItem('myCard'));
  //   console.log(this.cartItems);
  //   this.cartItems.forEach((val, i, arr) => {
  //     console.log(val.id);
  //     if (val.id === id) {
  //       let count = parseInt(arr[i].quantity);
  //       if (count > 0) {
  //         count++;
  //         arr[i].quantity = count;
  //         console.log(count);
  //       }
  //     }
  //     totalP += parseInt(val.quantity) * parseInt(val.price);
  //     console.log(totalP);
  //     this.total = totalP;
  //   });
  //   localStorage.setItem('myCard', JSON.stringify(this.cartItems));
  // }


}
