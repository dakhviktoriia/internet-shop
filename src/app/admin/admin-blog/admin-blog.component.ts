import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IForum, IBlog } from 'src/app/shared/interfaces/home.interface';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map, throttleTime } from 'rxjs/operators';
@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.css']
})
export class AdminBlogComponent implements OnInit {

  forums: Array<IForum>;
  title: string;
  category: string = "category...";
  text: string;
  author: string = "admin";
  img: string = 'img';
  date: any = new Date();
  blogs: Array<IBlog> = [];
  comments: Array<any> = [];
  commentsEdit: Array<any> = [];

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  productImage: string;

  checkImage: boolean = false;
  checkEdit: boolean;
  idEdit: string;
  checkVal: boolean;
  idImg: string = '';
  idImgEdit: string;

  constructor(
    private firestore: AngularFirestore,
    private prStorage: AngularFireStorage) {
    this.getForums();
    this.getBlogs();
  }

  ngOnInit() {
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



  public upload(event): void {
    const id = Math.random().toString(36).substring(2);
    this.idImg = id;
    this.ref = this.prStorage.ref(`images_blog/${id}`);
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

  public saveImage(): void {
    this.img = this.productImage;
    console.log(this.img);
  }

  public showImage(): void {
    this.checkImage = !this.checkImage;
    console.log(this.checkImage);

  }



  public onSubmit() {
    if (this.title && this.text && this.category) {
      this.checkVal = false;
      const data = {
        title: this.title,
        category: this.category,
        text: this.text,
        author: this.author,
        date: this.date = new Date(),
        img: this.img,
        comments: this.comments,
        idImg: this.idImg


      };
      console.log(data);
      this.firestore.collection('blogs').add(data);
      this.title = '';
      this.category = 'category...';
      this.text = '';
      this.checkImage = false;
      this.productImage = '';

    } else {
      this.checkVal = true;
    }

  }




  public getBlogs() {
    this.firestore.collection('blogs').snapshotChanges().subscribe(
      arrayForums => {
        this.blogs = arrayForums.map(forum => {
          return {
            id: forum.payload.doc.id,
            ...forum.payload.doc.data()
          } as IBlog;
        });
        console.log(this.blogs);

      }
    );

  }



  public onEdit(blog: IBlog): void {
    console.log(blog);

    this.title = blog.title;
    this.text = blog.text;
    this.category = blog.category;
    window.scrollTo({ top: 210, behavior: 'smooth' });
    this.commentsEdit = blog.comments;
    console.log(this.commentsEdit);
    this.checkEdit = true;
    this.checkVal = false;
    // this.idEdit = blog.id;
    // this.idImgEdit = blog.idImg;
    this.author = blog.author;



  }

  public deleteComment(comment): void {
    console.log(comment);
    this.commentsEdit.splice(this.commentsEdit.indexOf(comment), 1);

  }

  public saveEdit(): void {
    if (this.title && this.text && this.category) {
      this.checkVal = false;
      this.checkEdit = false;
      this.firestore.doc('blogs/' + this.idEdit).update({ 'title': this.title });
      this.firestore.doc('blogs/' + this.idEdit).update({ 'category': this.category });
      this.firestore.doc('blogs/' + this.idEdit).update({ 'text': this.text });
      this.firestore.doc('blogs/' + this.idEdit).update({ 'comments': this.commentsEdit });
      this.firestore.doc('blogs/' + this.idEdit).update({ 'date': new Date() });
      this.firestore.doc('blogs/' + this.idEdit).update({ 'img': this.productImage });
      this.title = '';
      this.category = 'category...';
      this.text = '';
      this.checkImage = false;
      this.author = 'admin';
    } else {
      this.checkVal = true;
    }
  }

  public onDelete(id: string, idImg: string) {

    if (confirm('Are you sure to delete this record')) {
      this.prStorage.ref(`images_blog/${idImg}`).delete();
      this.firestore.doc('blogs/' + id).delete();
    }
  }

}
