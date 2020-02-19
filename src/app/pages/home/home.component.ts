import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/home.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { ForumService } from 'src/app/shared/services/forum.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<IProduct> = [];
  productsNew: Array<IProduct> = [];

  constructor(
    private firestore: AngularFirestore,
    private productServise: ForumService) {
    this.getProducts();

   }

  ngOnInit() {
  }

  public productDetail(val): void {
    console.log(val);
    this.productServise.productDetail = val;
  }

  public scroll(): void {
    // window.scrollTo(0, 2250);
    window.scrollTo({top: 2250, behavior: 'smooth'})

  }
  public getProducts() {
    this.firestore.collection('products').snapshotChanges().subscribe(
      arrayProducts => {
        this.products = arrayProducts.map(product => {
          return {
            id: product.payload.doc.id,
            ...product.payload.doc.data()
          } as IProduct;
        });
      this.productsNew = this.products.filter(item => item.newarrival === true);
      console.log(this.productsNew);
      
      }
    );

  }



}
