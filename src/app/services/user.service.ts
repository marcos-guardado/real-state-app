import { Injectable } from '@angular/core';
import {
  docData,
  DocumentData,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import {
  addDoc,
  doc,
  documentId,
  DocumentReference,
  getDocs,
} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  getUserById(id: string): Observable<DocumentData> {
    const user = doc(this.firestore, `users/${id}`);
    return docData(user, { idField: '_id' });
  }

  login({ email }: firebase.User) {
    collectionData(collection(this.firestore, 'users'))
      .pipe(map((users) => users.find((user) => user['email'] === email)))
      .subscribe((user) => {
        if (user) {
          sessionStorage.setItem('user', JSON.stringify(user));
        } else {
          throw Error('An error has ocurred');
        }
      });
  }

  async createUser(user: firebase.User, userType: string) {
    const newUser = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      role: userType,
    };
    const usersCollectionRef = collection(this.firestore, 'users');
    try {
      docData(await addDoc(usersCollectionRef, newUser), {
        idField: '_id',
      }).subscribe((user) => {
        sessionStorage.setItem('user', JSON.stringify(user));
      });
    } catch (err: any) {
      throw Error('An error has ocurred');
    }
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }
}
