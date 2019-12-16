import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { UploadService } from '../storage/upload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private file: File;

  constructor(private auth: AuthService, private db: AngularFirestore, private upload: UploadService) { }

  ngOnInit() {
  }

  yapForm = new FormGroup({
    yap: new FormControl('')
  });

  postYap() {

    let user = this.auth.getUser();

    // this.uploadFile(this.file);

    this.db.collection('yaps').add({
      yap: this.yapForm.get('yap').value,
      name: user.displayName,
      date: Date(), 
      uid: user.uid,
      // imagePath: this.upload.getFilePath()
    });
  }

  handleFile($event) {
    this.file = $event.target.file;
  }

  uploadFile(file: File) {
    this.upload.uploadFile(file);
  }

  signOut() {
    console.log("Signing out ...");
    this.auth.logout();
  }

}