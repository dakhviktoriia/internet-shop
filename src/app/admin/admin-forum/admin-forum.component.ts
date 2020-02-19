import { Component, OnInit } from '@angular/core';
import { IForum } from 'src/app/shared/interfaces/home.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { NgForm } from '@angular/forms';
import { finalize, map, throttleTime } from 'rxjs/operators';

import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-forum',
  templateUrl: './admin-forum.component.html',
  styleUrls: ['./admin-forum.component.css']
})
export class AdminForumComponent implements OnInit {


  title: string;
  text: string;
  img: string;
  forums: Array<IForum>;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  productImage: string;

  checkEdit: boolean;
  idEdit:string;
  idImg: string;

  editImgId: string;

  checkVal: boolean;
  constructor(
    private firestore: AngularFirestore,
    private prStorage: AngularFireStorage) {
      this.getForums();
     }

  ngOnInit() {
  }


  addImageandProducts(): void {
    this.img = this.productImage;
    console.log(this.img);

  }

  public upload(event): void {
    const id = Math.random().toString(36).substring(2);
    this.idImg = id;
    this.ref = this.prStorage.ref(` images-forum/${id}`);
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

  public onSubmit(form: NgForm) {
    if (this.title && this.text && this.productImage) {
      this.checkVal = false;
      const data = Object.assign({}, form.value);
      console.log(data);
      delete data.id;
      if (form.value.id == null) {
        this.firestore.collection('forum').add(data);
      } else {
        this.firestore.doc('forum/' + form.value.id).update(data);

      }
      this.title = '';
      this.text = '';
      this.productImage = '';
    } else {
      this.checkVal = true;

    }

  }

  public getForums() {
    this.firestore.collection('forum').snapshotChanges().subscribe(
      arrayForums => {
        this.forums = arrayForums.map(forum => {
          return {
            id: forum.payload.doc.id,
            ...forum.payload.doc.data()
          } as IForum;
        });
        console.log(this.forums);

      }
    );

  }

  public onEdit(forum: IForum): void {
    window.scrollTo({top: 210, behavior: 'smooth'});
    this.checkEdit = true;
    this.checkVal = false;
    console.log(forum);
    this.title = forum.title;
    this.text = forum.text;
    this.productImage = forum.img;
    // this.idEdit = forum.id;


  }


  public saveEdit(): void {
    if (this.title && this.text && this.productImage) {
      this.checkVal = false;
      this.checkEdit = false;
      this.firestore.doc('forum/' + this.idEdit).update({ 'title': this.title });
      this.firestore.doc('forum/' + this.idEdit).update({ 'text': this.text });
      this.firestore.doc('forum/' + this.idEdit).update({ 'img': this.productImage });
      this.title = '';
      this.text = '';
      this.productImage = '';
    } else {
      this.checkVal = true;
    }

  }
  public onDelete(id: string, idimg: string) {
    if (confirm('Are you sure to delete this record')) {
      this.prStorage.ref(` images-forum/${idimg}`).delete();
      this.firestore.doc('forum/' + id).delete();
    }
  }




}
