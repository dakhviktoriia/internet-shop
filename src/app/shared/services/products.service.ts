import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/home.interface';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productsFire: Array<IProduct>;

  constructor(private firestore: AngularFirestore) { }


}
