import { Component, OnInit} from '@angular/core';
import { ForumService } from 'src/app/shared/services/forum.service';
import { IBlog } from 'src/app/shared/interfaces/home.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-forum-blog3',
  templateUrl: './forum-blog3.component.html',
  styleUrls: ['./forum-blog3.component.css']
})
export class ForumBlog3Component implements OnInit {



  blog: IBlog;
  user: firebase.User;
  authError: any;

  comment: string;

  currentBlog: IBlog;
  currentId: string;
  currentComments: Array<any> = [];
  commentLength: number;
  commentCheck: boolean;
  idBlog: string;
  checkValCom: boolean;
  constructor(private forumServise: ForumService,
              private auth: AuthService,
              private firestore: AngularFirestore) {

     }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });

    console.log(this.user);

    this.getBlog();
    this.auth.eventAuthError$.subscribe(data => {
      this.authError = data;
    });
  }



  public deleteComment(val, id): void {
    this.blog.comments.splice(this.blog.comments.indexOf(val), 1);
    console.log(this.blog.comments);
    this.firestore.doc('blogs/' + id).update({ "comments": this.blog.comments });

  }

  public makeComment(blog): void {
    
    if (this.comment) {
      this.checkValCom = false;
      const data = {
        comment: this.comment,
        author: this.user.displayName
      };
      blog.comments.push(data);
      this.firestore.doc('blogs/' + blog.id).update(blog);
      console.log(blog);
      this.getBlog();
      this.idBlog = blog.id;
      // this.closeModal.nativeElement.click();
      this.comment  = '';
    } else {
      this.checkValCom = true;
    }

  }

  public showComment(): void{
    this.commentCheck = !this.commentCheck

  }

  getBlog(): void {
    this.blog = this.forumServise.forumBlog2;
    console.log(this.blog);
    this.commentLength = this.blog.comments.length;

  }

  createUser(frm) {
    this.auth.createUser(frm.value);
    
  }

  login(frm) {
    this.auth.login(frm.value.email, frm.value.password);
  }

  logout() {
    this.auth.logout();
  }

}
