import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-subscribe',
  templateUrl: './admin-subscribe.component.html',
  styleUrls: ['./admin-subscribe.component.css']
})
export class AdminSubscribeComponent implements OnInit {

  emails: Array<any>;
  constructor(private firestore: AngularFirestore) {
    this.getEmails();
   }

  ngOnInit() {
  }

  public getEmails() {
    this.firestore.collection('subscribers').snapshotChanges().subscribe(
      arrayEmails => {
        this.emails = arrayEmails.map(email => {
          return {
            id: email.payload.doc.id,
            ...email.payload.doc.data()
          } as any;
        });
        console.log(this.emails);
      }
    );
  }
}
