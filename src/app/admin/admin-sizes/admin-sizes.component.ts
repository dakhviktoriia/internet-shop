import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { ISize } from 'selenium-webdriver';

@Component({
  selector: 'app-admin-sizes',
  templateUrl: './admin-sizes.component.html',
  styleUrls: ['./admin-sizes.component.css']
})
export class AdminSizesComponent implements OnInit {
  size: string;
  checkSize: boolean = false;
  sizes: Array<ISize>;
  checkEdit = false;
  idEdit;
  check: boolean;


  constructor(private firestore: AngularFirestore) {
    this.getSizes();
   }

  ngOnInit() {
  }

  public onSubmit(form: NgForm) {
    if(this.size){
      this.check = false;
      const data = Object.assign({}, form.value);
      console.log(data);
      delete data.id;
      if (form.value.id == null) {
        this.firestore.collection('size').add(data);
      } else {
        this.firestore.doc('size/' + form.value.id).update(data);
  }
      this.size = '';
    } else {
      this.check = true;
    }

  }

  public getSizes() {
    this.firestore.collection('size').snapshotChanges().subscribe(
      arraySizes => {
        this.sizes = arraySizes.map(sizeS => {
          return {
            id: sizeS.payload.doc.id,
            ...sizeS.payload.doc.data()
          } as ISize;
        });
        console.log(this.sizes);

      }
    );

  }

  public onEdit(val): void {
    window.scrollTo({ top: 210, behavior: 'smooth' });
    this.check = false;
    this.size = val.size;
    this.checkEdit = true;
    this.idEdit = val.id;


  }

  public saveEdit(): void {

    if(this.size){
      this.check = false;
      console.log(this.idEdit);
      this.firestore.doc('size/' + this.idEdit).update({ "size": this.size });
      this.checkEdit = false;
      this.size = '';
    } else {
      this.check = true;

    }
    

  }
  onDelete(id: string) {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('size/' + id).delete();
    }
  }

}
