import { Component, OnInit } from '@angular/core';
import { IForum } from 'src/app/shared/interfaces/home.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { ForumService } from 'src/app/shared/services/forum.service';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  nameForumTitle: string;
  checkNext: boolean = true;

  constructor(private forumServise: ForumService) {
    this.forumServise.getName();
    

  }
  ngOnInit() {
    this.forumServise.getName();
    this.nameForumTitle  = this.forumServise.getName();
    console.log(this.nameForumTitle);
  }

  public next(): void {
    this.checkNext = false;
  }

}
