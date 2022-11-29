import { Injectable } from '@angular/core';
import {
  docData,
  DocumentData,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { addDoc, doc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { map, Observable, Subject } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  sessionStorage$: Subject<IUser> = new Subject<IUser>();
  constructor(private firestore: Firestore) {
    this.sessionStorage$.subscribe((user: IUser) => {
      sessionStorage.setItem('user', JSON.stringify(user));
    });
  }

  getUserById(id: string): Observable<DocumentData> {
    const user = doc(this.firestore, `users/${id}`);
    return docData(user, { idField: '_id' });
  }

  login({ email }: firebase.User) {
    collectionData(collection(this.firestore, 'users'), { idField: '_id' })
      .pipe(map((users) => users.find((user) => user['email'] === email)))
      .subscribe((user) => {
        if (user) {
          this.sessionStorage$.next(user as IUser);
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
        this.sessionStorage$.next(user as IUser);
      });
    } catch (err: any) {
      throw Error('An error has ocurred');
    }
  }

  getUser(): Observable<IUser> {
    return new Observable((subscriber) => {
      subscriber.next(JSON.parse(sessionStorage.getItem('user') || '{}'));
    });
  }
}
