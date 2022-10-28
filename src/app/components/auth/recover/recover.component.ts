import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseErrorService } from 'src/app/services/firebase-error.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {
  recoverUser: FormGroup;
  loading: boolean = false;

  constructor( 
              private fb: FormBuilder,
              private afAuth: AngularFireAuth,
              private toastr: ToastrService,
              private router: Router,
              private firebaseError: FirebaseErrorService) {
                this.recoverUser = this.fb.group({
                  correo: ['', Validators.required]
                })
              }

  ngOnInit(): void {
  }

  recover() {
    const email = this.recoverUser.value.correo;

    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.toastr.info('We send an email to reset the password', 'Attention')
      this.router.navigate(['/login']);
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.codeError(error.code), 'Error');
    })
  }

}
