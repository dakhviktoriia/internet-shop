import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IProduct, IColor, ISize } from 'src/app/shared/interfaces/home.interface';
import { Product } from 'src/app/shared/classes/home.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, map, throttleTime } from 'rxjs/operators';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  name: string;
  category: string = 'category...';
  price: number;
  color: Array<IColor> = [];
  size: Array<string> = [];
  bestseller: boolean = false;
  newarrival: boolean = false;
  descrsption: string;
  imageUrl: Array<Object> = [];
  colorModal: string = "";


  formData: IProduct;
  products: Array<IProduct> = [];
  colors: Array<IColor> = [];
  sizes: Array<string> = [];
  status: Array<string> = [];
  categories: Array<string> = [];


  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  productImage: string;

  checkBoxColor: boolean;
  checkBoxSize: boolean;
  checkModal: boolean;
  checkNew: boolean;
  checkBest: boolean;
  checkSave: boolean;
  checkVal: boolean;

  idImg: string;
  colorsEdit = [];
  idEdit;
  constructor(
    private firestore: AngularFirestore,
    private prStorage: AngularFireStorage) {
    this.getProducts();
    this.getColors();
    this.getSizes();
    this.getСategories();
  }

  ngOnInit() {
  }




  public addColor(valColor: IColor): void {
    this.productImage = '';
    console.log(valColor);
    this.colorModal = valColor.name;
    valColor.checkColor = !valColor.checkColor;
    if (valColor.checkColor) {
      console.log(this.color);
      this.color.push(valColor);
      this.checkModal = true;

    } else {
      const a = this.color.indexOf(valColor);
      this.color.splice(a, 1);
      this.checkModal =  false;
      this.imageUrl.splice(a,1);
    }

  }

  public addImage(): void {
    const image = {
      color: this.colorModal,
      img: this.productImage,
      id: this.idImg

    };
    this.imageUrl.push(image);
    console.log(this.imageUrl);
    console.log(this.color);

  }

  public addSize(valSize): void {
    valSize.checkSize = !valSize.checkSize;
    if (valSize.checkSize) {
      this.size.push(valSize);
    } else {
      const b = this.size.indexOf(valSize);
      this.size.splice(b, 1);

    }
  }


  public addBestSeller(): void {
    this.bestseller = !this.bestseller;
  }

  public addArrival(): void {
    this.newarrival = !this.newarrival;
  }


  public upload(event): void {
    const id = Math.random().toString(36).substring(2);
    this.idImg = id;
    this.ref = this.prStorage.ref(`images_products/${id}`);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadState = this.task.snapshotChanges().pipe(map(s => s.state));
    this.uploadProgress = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = this.ref.getDownloadURL();
        this.downloadURL.subscribe(url => this.productImage = url);
      })
    ).subscribe();
  }




  public onSubmit(): void {

    if (this.name && this.category && this.price && this.color.length !== 0 && this.size.length !== 0 && this.descrsption){
      this.checkVal = false;
      const data = {
        name: this.name,
        category: this.category,
        price: this.price,
        color: this.color,
        size: this.size,
        bestseller: this.bestseller,
        newarrival: this.newarrival,
        descrsption: this.descrsption,
        imageUrl: this.imageUrl
  
      };
      this.firestore.collection('products').add(data);
      this.name = '';
      this.category = 'category...';
      this.price = null;
      this.color = [];
      this.descrsption = '';
      this.checkBoxColor = false;
      this.checkBoxSize = false;
      this.imageUrl = [];
      this.checkNew = false;
      this.checkBest = false;
    } else {
      console.log(this.color);
      console.log(this.size);

      this.checkVal = true;
    }

  }


  public getProducts(): void {
    this.firestore.collection('products').snapshotChanges().subscribe(
      arrayProducts => {
        this.products = arrayProducts.map(product => {
          return {
            id: product.payload.doc.id,
            ...product.payload.doc.data()
          } as IProduct;
        });
        console.log(this.products);

      }
    );

  }

  public getColors(): void {
    this.firestore.collection('colors').snapshotChanges().subscribe(
      arrayColors => {
        this.colors = arrayColors.map(color => {
          return {
            id: color.payload.doc.id,
            ...color.payload.doc.data()
          } as IColor;
        });
        console.log(this.colors);

      }
    );

  }

  public getSizes(): void {
    this.firestore.collection('size').snapshotChanges().subscribe(
      arraySizes => {
        this.sizes = arraySizes.map(size => {
          return {
            id: size.payload.doc.id,
            ...size.payload.doc.data()
          } as string;
        });
        console.log(this.sizes);

      }
    );

  }

  public getСategories(): void {
    this.firestore.collection('categories').snapshotChanges().subscribe(
      arrayCategories => {
        this.categories = arrayCategories.map(category => {
          return {
            id: category.payload.doc.id,
            ...category.payload.doc.data()
          } as string;
        });
        console.log(this.categories);

      }
    );

  }


  public onEdit(product: IProduct): void {
    this.idEdit = product.id;
    console.log(this.idEdit);
    
    this.checkSave = true;
    window.scrollTo({top: 210, behavior: 'smooth'})
    this.name = product.name;
    this.category = product.category;
    this.price = product.price;
    this.descrsption = product.descrsption;
    this.checkNew = product.newarrival;
    product.color.forEach(val => {
      // this.colorsEdit.push(val.name);
    });
    console.log(this.colorsEdit);

  }

  public saveEdit(): void {
    if (this.name && this.category && this.price && this.descrsption){
      this.checkVal = false;
      this.firestore.doc('products/' + this.idEdit).update({ 'name': this.name });
      this.firestore.doc('products/' + this.idEdit).update({ 'category': this.category });
      this.firestore.doc('products/' + this.idEdit).update({ 'price': this.price });
      this.firestore.doc('products/' + this.idEdit).update({ 'descrsption': this.descrsption });
      this.name = '';
      this.category = 'category...';
      this.price = null;
      this.color = [];
      this.descrsption = '';
      this.checkBoxColor = false;
      this.checkBoxSize = false;
      this.imageUrl = [];
      this.checkNew = false;
      this.checkBest = false;
    } else {
      this.checkVal = true;
    }
  }

  public onDelete(id: string, idImg: Array<any>): void {
    if (confirm('Are you sure to delete this record')) {
      idImg.forEach(element => {
        this.prStorage.ref(`images_products/${element.id}`).delete();
      });
      this.firestore.doc('products/' + id).delete();
    }
  }

}


