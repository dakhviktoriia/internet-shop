import { Injectable } from '@angular/core';
import { IForum, IProduct, IBlog } from '../interfaces/home.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  productsFire: Array<IProduct>;
  forumBlog1;
  blogDetail;
  productDetail: IProduct;
  productCartService = [];
  forumBlog2: IBlog;

  nameForum: string;
  cartItems = [];
  cartNum;

  constructor(private firestore: AngularFirestore) {
    this.getForums();
    this.getName();
    this.getCartItem();
    console.log('service works');
}


public getCartItem() {
  if (localStorage.length > 0) {
    if (localStorage.getItem('myCard')) {
      this.cartItems = JSON.parse(localStorage.getItem('myCard'));
      console.log(this.cartItems);
      this.cartNum = this.cartItems.length;
    }
  }
}

  public getName(): string {
    console.log(this.nameForum);
    return this.nameForum;
  }



  public getForums() {
    return this.firestore.collection('forum').snapshotChanges();
  }


  public getProducts() {
    this.firestore.collection('products').snapshotChanges().subscribe(
      arrayProducts => {
        this.productsFire = arrayProducts.map(product => {
          return {
            id: product.payload.doc.id,
            ...product.payload.doc.data()
          } as IProduct;
        });
        console.log(this.productsFire);

      }
    );

  }

  public getProduct(): IProduct {
    console.log(this.productDetail);
    return this.productDetail;
  }


}
