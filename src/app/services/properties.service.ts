import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  DocumentData,
  doc,
  docData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertiesService {
  constructor(private firestore: Firestore) {}

  getProperties(): Observable<DocumentData[]> {
    const propertiesCollection = collection(this.firestore, 'properties');
    return collectionData(propertiesCollection, { idField: '_id' });
  }

  getPropertyById(id: string): Observable<DocumentData> {
    const property = doc(this.firestore, `properties/${id}`)
    return docData(property, { idField: '_id' })
  }
}
