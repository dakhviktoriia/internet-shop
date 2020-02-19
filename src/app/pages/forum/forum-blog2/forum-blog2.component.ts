import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ForumService } from 'src/app/shared/services/forum.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IBlog } from 'src/app/shared/interfaces/home.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Blog } from 'src/app/shared/classes/home.model';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map, throttleTime } from 'rxjs/operators';

@Component({
  selector: 'app-forum-blog2',
  templateUrl: './forum-blog2.component.html',
  styleUrls: ['./forum-blog2.component.css']
})
export class ForumBlog2Component implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;

  forumBlog2;
  blogs: Array<IBlog> = [];
  forumClick;
  user: firebase.User;


  title: string;
  text: string;
  date: any = new Date();
  checkImage: boolean;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  productImage: string;

  img: string = ' ';
  idImg: string = '';
  comments: Array<any> = [];
  checkVal: boolean;
  constructor(
    private firestore: AngularFirestore,
    private forumServise: ForumService,
    private auth: AuthService,
    private prStorage: AngularFireStorage) {
    this.getForum();
    this.getBlogs();
    this.forumClick = this.forumServise.forumBlog1;
    this.forumServise.getName();
  }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });
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
    console.log(this.productImage);
    console.log(this.img);
  }

  public deletePost(blog): void {
    if (confirm('Are you sure to delete this record')) {
      this.prStorage.ref(`images_blog/${blog.idImg}`).delete();
      this.firestore.doc('blogs/' + blog.id).delete();
    }
  }


  public createPost(category): void {
    console.log(category);
    if (this.title && this.text) {
      this.checkVal = false;
      // this.closeModal.nativeElement.click();
      const data = {
        title: this.title,
        category: category,
        text: this.text,
        author: this.user.displayName,
        date: this.date = new Date(),
        img: this.img,
        comments: this.comments,
        idImg: this.idImg

      };
      console.log(data);
      this.firestore.collection('blogs').add(data);
      this.title = '';
      this.text = '';
      this.checkImage = false;
      this.productImage = '';

    } else {
      this.checkVal = true;
    }
  }

  public showImage(): void {
    this.checkImage = !this.checkImage;
  }

  public getBlogs() {
    this.firestore.collection('blogs').snapshotChanges().subscribe(
      arrayBlogs => {
        this.blogs = arrayBlogs.map(blog => {
          return {
            id: blog.payload.doc.id,
            ...blog.payload.doc.data()
          } as IBlog;
        });
        console.log(this.blogs);

      }
    );

  }

  public getForum(): void {
    this.forumBlog2 = this.forumServise.forumBlog1;
    console.log(this.forumBlog2);
  }

  public showBlog(blog: IBlog): void {
    console.log(blog);
    this.forumServise.forumBlog2 = blog;
  }


}
