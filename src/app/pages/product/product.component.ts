import { Component, OnInit } from '@angular/core';
import { ForumService } from 'src/app/shared/services/forum.service';
import { IProduct } from 'src/app/shared/interfaces/home.interface';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: IProduct;
  cartProducts: Array<any> = [];
  showPrIndo: boolean = false;
  showRe: boolean = false;
  showShi: boolean = false;
  quantity: number = 1;
  size: string = 'Select';
  color: string;
  imageChange;
  colorName: string;

  checkColor: boolean;
  checkSize: boolean;

  addCart: boolean;


  constructor(private productServise: ForumService) {
    this.product = this.productServise.getProduct();
    console.log(this.product.name);
    this.imageChange = this.product.imageUrl[0].img;
  }

  ngOnInit() { }


  public addToCart(product): void {
    this.productServise.getCartItem();
    console.log(product);
    console.log(this.cartProducts);

    if (this.size && this.color && this.size !== 'Select') {

      this.addCart = true;
      setTimeout(() => {
        this.addCart = false;
      }, 3000);
      if (localStorage.length === 0) {
        this.cartProducts.push({
          id: product.id,
          name: product.name,
          price: product.price,
          size: this.size,
          color: this.color,
          quantity: this.quantity,
          image: this.imageChange
        });
        localStorage.setItem('myCard', JSON.stringify(this.cartProducts));
      } else if (localStorage.length > 0) {
        if (localStorage.getItem('myCard')) {
          this.cartProducts = JSON.parse(localStorage.getItem('myCard'));
          this.cartProducts.push({
            id: product.id,
            name: product.name,
            price: product.price,
            size: this.size,
            color: this.color,
            quantity: this.quantity,
            image: this.imageChange
          });
          localStorage.setItem('myCard', JSON.stringify(this.cartProducts));
        }
      }
    }

    if (this.size === 'Select') {
      console.log(this.size);
      this.checkSize = true;
    }
    if (!this.color) {
      this.checkColor = true;
    }

  }

  Size() {
    this.checkSize = false;

  }

  public chooseColor(color, image) {
    this.checkColor = false;
    this.color = color.name;
    this.colorName = color.name;
    console.log(color);
    console.log(image);

    image.forEach(element => {
      if (color.name === element.color) {
        this.imageChange = element.img;
        console.log(color.name);
        console.log(element.img);

      }
    });
  }

  public changeImage(val): void {
    this.imageChange = val;
    console.log(val);
  }

  public showMorePr(): void {
    this.showPrIndo = !this.showPrIndo;
    this.showRe = false;
    this.showShi = false;

  }

  public showMoreRe(): void {
    this.showRe = !this.showRe;
    this.showPrIndo = false;
    this.showShi = false;
  }

  public showMoreShi(): void {
    this.showShi = !this.showShi;
    this.showRe = false;
    this.showPrIndo = false;
  }
}
