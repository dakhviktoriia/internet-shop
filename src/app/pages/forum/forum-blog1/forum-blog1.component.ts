import { Component, OnInit } from '@angular/core';
import { IForum } from 'src/app/shared/interfaces/home.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { ForumService } from 'src/app/shared/services/forum.service';

@Component({
  selector: 'app-forum-blog1',
  templateUrl: './forum-blog1.component.html',
  styleUrls: ['./forum-blog1.component.css']
})
export class ForumBlog1Component implements OnInit {
  forums: Array<IForum> = [];
  idForum: string;
  showArrow: boolean;

  constructor(private forumServise: ForumService) {
    this.forumServise.getForums();
    this.getFireForums();
  }

  ngOnInit() {



  }


  private getFireForums() {
    this.forumServise.getForums().subscribe(
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

  public showForum(val: IForum): void {
    this.forumServise.forumBlog1 = val;
    console.log(val);
    this.forumServise.nameForum = val.title;

  }



}
