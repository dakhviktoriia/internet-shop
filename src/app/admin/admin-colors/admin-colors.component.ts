import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { IColor } from 'src/app/shared/interfaces/home.interface';

@Component({
  selector: 'app-admin-colors',
  templateUrl: './admin-colors.component.html',
  styleUrls: ['./admin-colors.component.css']
})
export class AdminColorsComponent implements OnInit {


  color: string;
  name: string;
  checkColor: boolean = false;
  active: boolean = false;

  formData: IColor;
  colors: Array<IColor> = [];
  checkEdit = false;
  check: boolean;
  idEdit: string;

  constructor(private firestore: AngularFirestore) {
    this.getColors();
  }

  ngOnInit() {
  }





  public onSubmit(form: NgForm) {

    if (this.name && this.color) {
      this.check = false;
      const data = Object.assign({}, form.value);
      console.log(data);
      delete data.id;
      if (form.value.id == null) {
        this.firestore.collection('colors').add(data);
      } else {
        this.firestore.doc('colors/' + form.value.id).update(data);
      }
      this.color = '';
      this.name = '';

    } else {
      this.check = true;
    }
  }

  public getColors() {
    this.firestore.collection('colors').snapshotChanges().subscribe(
      arrayColors => {
        this.colors = arrayColors.map(colorC => {
          return {
            id: colorC.payload.doc.id,
            ...colorC.payload.doc.data()
          } as IColor;
        });
        console.log(this.colors);

      }
    );

  }

  public saveEdit(): void {
    if (this.name && this.color) {
      console.log(this.idEdit);
      this.firestore.doc('colors/' + this.idEdit).update({ 'color': this.color });
      this.firestore.doc('colors/' + this.idEdit).update({ 'name': this.name });
      this.checkEdit = false;
      this.name = '';
      this.color = '';
      this.check = false;
    } else {
      this.check = true;
    }



  }

  public onEdit(val): void {
    this.check = false;
    window.scrollTo({ top: 210, behavior: 'smooth' });
    this.color = val.color;
    this.name = val.name;
    this.checkEdit = true;
    this.idEdit = val.id;

  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record')) {
      this.firestore.doc('colors/' + id).delete();
    }
  }


}
