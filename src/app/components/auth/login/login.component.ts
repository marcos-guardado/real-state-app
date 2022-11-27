import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  showRegister: boolean = false;
  userTypeSelected: 'seller' | 'buyer' | '' = '';
  usersType = [
    {
      label: 'Seller',
      value: 'seller',
    },
    {
      label: 'Buyer',
      value: 'buyer',
    },
  ];
  constructor(
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseErrorService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  async login() {
    this.loading = true;
    try {
      const user: firebase.auth.UserCredential =
        await this.afAuth.signInWithPopup(
          new firebase.auth.GoogleAuthProvider().setCustomParameters({
            prompt: 'select_account',
          })
        );
      this.userService.login(user.user!);
      this.loading = false;
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(err.code), 'Notification');
    }
  }

  async createNewUser() {
    try {
      const user: firebase.auth.UserCredential =
        await this.afAuth.signInWithPopup(
          new firebase.auth.GoogleAuthProvider().setCustomParameters({
            prompt: 'select_account',
          })
        );
      this.userService.createUser(user.user!, this.userTypeSelected as string);
      this.loading = false;
      this.showRegister = false;
      this.router.navigate(['/home']);
    } catch (err: any) {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(err.code), 'Notification');
    }
  }

  showRegisterModal() {
    this.showRegister = true;
  }
}
