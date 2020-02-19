import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  category: string;
  categories: Array<string> = [];
  checkEdit = false;
  idEdit;
  active: boolean = false;
  check: boolean;
  constructor(private firestore: AngularFirestore) {
    this.getCategories();
  }

  ngOnInit() {
  }

  public onSubmit(form: NgForm) {
    if (this.category) {
      this.check = false;
      const data = Object.assign({}, form.value);
      console.log(data);
      delete data.id;
      if (form.value.id == null) {
        this.firestore.collection('categories').add(data);
      } else {
        this.firestore.doc('categories/' + form.value.id).update(data);
      }
      this.category = '';
    } else {
      this.check = true;

    }

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
        console.log(this.categories);
      }
    );

  }

  public onDelete(id: string): void {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('categories/' + id).delete();
    }
  }

  public onEdit(val): void {
    this.check = false;
    window.scrollTo({ top: 210, behavior: 'smooth' });
    this.category = val.category;
    this.checkEdit = true;
    this.idEdit = val.id;

  }

  public saveEdit(): void {

    if (this.category) {
      this.check = false;
      this.firestore.doc('categories/' + this.idEdit).update({ "category": this.category });
      this.checkEdit = false;
      this.category = '';
    } else {
      this.check = true;

    }


    console.log(this.idEdit);


  }



}
