import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }
   users = [];
  ngOnInit() {
    this.getUsers()
  }
  public getUsers() {
    this.firestore.collection('Users').snapshotChanges().subscribe(
      arrayUsers => {
        this.users = arrayUsers.map(user => {
          return {
            id: user.payload.doc.id,
            ...user.payload.doc.data()
          } as any;
        });
        console.log(this.users);

      }
    );

  }
}
