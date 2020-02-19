import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  email: string;
  colorBorder: string;
  regExpEmail = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/;
  constructor(private firestore: AngularFirestore) { }

  ngOnInit() {
  }

  public scroll(): void{
    window.scrollTo({top: 1090, behavior: 'smooth'})

  }



  public changeInput() {
    if (this.email && this.regExpEmail.test(this.email)) {
      this.colorBorder = '3px solid gray';
      console.log(this.email);
    } else {
      this.colorBorder = '3px solid red';
      console.log('false');

    }
  }
  public addEmail() {
    if (this.email && this.regExpEmail.test(this.email)) {
      const data = {
        email: this.email
      };
      this.firestore.collection('subscribers').add(data);
      this.email = '';
    } else {

      this.colorBorder = '3px solid red';
    }
    }
}
