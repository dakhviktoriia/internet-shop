import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: Array<any>;
  constructor(private firestore: AngularFirestore) { 
    this.getOrders();
  }

  ngOnInit() {
  }

  public getOrders(): void {
    this.firestore.collection('orders').snapshotChanges().subscribe(
      arrayOrders => {
        this.orders = arrayOrders.map(order => {
          return {
            id: order.payload.doc.id,
            ...order.payload.doc.data()
          } as any;
        });
        console.log(this.orders);

      }
    );

  }

  public onDelete(id: string) {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('orders/' + id).delete();
    }
  }

}
