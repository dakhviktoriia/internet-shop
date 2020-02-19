import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct, IForum, IColor } from 'src/app/shared/interfaces/home.interface';
import { TouchSequence } from 'selenium-webdriver';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ForumService } from 'src/app/shared/services/forum.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Options } from 'ng5-slider';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']

})
export class ShopComponent implements OnInit {

  minValue: number = 15;
  maxValue: number = 40;
  options: Options = {
    floor: 0,
    ceil: 250
  };


  products: Array<IProduct> = [];
  sizeCollection: number;
  colors = [];
  sizes = [];
  categories = [];


  nameDetail: string;
  priceDetail: string;
  colorDetail: string;
  sizeDetail: string;


  checkColections = true;
  checkColor: boolean;
  checkSize: boolean;
  checkPrice: boolean;

  searchColor: string;
  a: number;


  page: number;
  itemPerPage = 12;
  productsPage: Array<IProduct>;
  arrayPag: Array<IProduct>;

  colorName = '';


  filterCat: IProduct;
  condition: boolean;

  sortColor: Array<any> = [];
  categorySearch;

  sort = 'Sort by';

  priceArr = [];

  categoryFilter = [];

  checkClear: boolean;
  constructor(
    private firestore: AngularFirestore,
    private productServise: ForumService
  ) {
    this.page = 1;
    this.getColors();
    this.getSizes();
    this.getProducts();
    this.getCategories();

  }

  ngOnInit() {


  }


  public sortSelect(): void {

    if (this.sort === 'Sort by') {
      this.getProducts();
    }
    if (this.sort === 'pricelow') {
      this.products.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (this.sort === 'pricehigh') {
      this.products.sort((a, b) => {
        return b.price - a.price;
      });
    }

    if (this.sort === 'az') {
      this.products.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
      });
    }
    if (this.sort === 'za') {
      this.products.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameB < nameA) {
          return -1;
        }
        if (nameB > nameA) {
          return 1;

        }
      });
    }
  }


  public showClear(): void {
    console.log('bla bla');
    this.sortColor = [];
    this.categoryFilter = [];
    this.colors.forEach(val => val.active = false);
    this.categories.forEach(val => val.active = false);
    this.maxValue = Math.max(...this.priceArr);
    this.minValue = Math.min(...this.priceArr);
  }



  public allCat() {
    this.categoryFilter = [];

  }

  public filterCategory(category) {
    this.categories.forEach(val => {
      if (val.category === category.category) {
        category.active = true;
        console.log(val.category);
      } else {
        val.active = false;
      }
    });
    console.log(category.category);

    if (this.categoryFilter.length === 0) {
      this.categoryFilter.push(category.category);
    } else {
      this.categoryFilter = [];
      this.categoryFilter.push(category.category);
    }

  }


  public filterColor(color: IColor) {
    console.log(this.products);
    color.active = !color.active;
    if (color.active) {
      this.sortColor.push(color.name);
    } else {
      this.sortColor.splice(this.sortColor.indexOf(color), 1);

    }
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
        console.log(this.products);
        this.sizeCollection = this.products.length;
        console.log(this.sizeCollection);
        this.productsPage = this.products;
        // this.getPageItems(this.productsPage, page, quantity)

        this.products.forEach(val => {
          this.priceArr.push(val.price);
        });
        console.log(this.priceArr);
        this.options.ceil = Math.max(...this.priceArr);
        this.options.floor = Math.min(...this.priceArr);

        this.maxValue = Math.max(...this.priceArr);
        this.minValue = Math.min(...this.priceArr);

      }
    );

  }

  // public getPageItems(products, page: number, quantity: number) {
  //   let startIndex = quantity * (page - 1);
  //   this.arrayPag = products.slice(startIndex, startIndex + quantity);
  //   console.log(this.arrayPag);
  //   console.log(products);
  //   console.log(page);
  //   console.log(quantity);
  //   return products;
  // }

  public productDetail(val): void {
    this.productServise.productDetail = val;
  }

  public showNameColor(val): void {
    this.colorName = ':' + val;
  }

  public hideColor(): void {
    this.colorName = ' ';

  }
  public showCollection(): void {
    this.checkColections = !this.checkColections;
  }

  public showColor(): void {
    this.checkColor = !this.checkColor;

  }
  public showSize(): void {
    this.checkSize = !this.checkSize;

  }

  public showPrice(): void {
    this.checkPrice = !this.checkPrice;

  }



  public getColors() {
    this.firestore.collection('colors').snapshotChanges().subscribe(
      arrayColors => {
        this.colors = arrayColors.map(color => {
          return {
            id: color.payload.doc.id,
            ...color.payload.doc.data()
          } as IProduct;
        });


      }
    );

  }
  public getSizes() {
    this.firestore.collection('size').snapshotChanges().subscribe(
      arraySizes => {
        this.sizes = arraySizes.map(sizeS => {
          return {
            id: sizeS.payload.doc.id,
            ...sizeS.payload.doc.data()
          } as string;
        });


      }
    );

  }

  public getCategories() {
    this.firestore.collection('categories').snapshotChanges().subscribe(
      arrayCategories => {
        this.categories = arrayCategories.map(category => {
          return {
            id: category.payload.doc.id,
            ...category.payload.doc.data()
          } as string;
        });


      }
    );

  }

  public btnSmothScroll() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  public filter(): void {
    console.log('change');
    console.log(this.minValue, this.maxValue);


  }


}
