import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IBlog } from 'src/app/shared/interfaces/home.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private firestore: AngularFirestore,
    private prStorage: AngularFireStorage) { }
  user: firebase.User;
  commentLength;
  users;
  blogs: Array<IBlog> = [];

  title: string;
  text: string;

  idEdit: string;

  ngOnInit() {
    this.getUsers();
    this.auth.getUserState()
    .subscribe(user => {
      this.user = user;
      console.log(user);

    });

    this.getBlogs();
  }

  public deleteComment(val, blog): void {
    console.log(blog);
    blog.comments.splice(blog.comments.indexOf(val), 1);
    console.log(blog.comments);
    this.firestore.doc('blogs/' + blog.id).update({ "comments": blog.comments });

  } 

  public getUsers() {
    this.firestore.collection('Users').snapshotChanges().subscribe(
      arrayProducts => {
        this.users = arrayProducts.map(user => {
          return {
            id: user.payload.doc.id,
            ...user.payload.doc.data()
          } as any;
        });
        console.log(this.users);
  


      }
    );

  }

  public saveEdit(): void{
    if (this.title && this.text) {
      this.firestore.doc('blogs/' + this.idEdit).update({ 'title': this.title });
      this.firestore.doc('blogs/' + this.idEdit).update({ 'text': this.text });
      this.firestore.doc('blogs/' + this.idEdit).update({ 'date': new Date() });
      this.title = '';
      this.text = '';

    } else {
    }
  }

  public deletePost(blog): void {
    if (confirm('Are you sure to delete this record')) {
      this.prStorage.ref(`images_blog/${blog.idImg}`).delete();
      this.firestore.doc('blogs/' + blog.id).delete();
    }
  }


  public editPost(blog) {
    this.title = blog.title;
    this.text = blog.text;
    this.idEdit = blog.id;
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
  
  logout() {
    this.auth.logout();
  }

}
