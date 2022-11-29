import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  DocumentData,
  doc,
  docData,
} from '@angular/fire/firestore';
 import { addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { Observable } from 'rxjs';
import { IProperty } from '../interfaces/property.interface';

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
    const property = doc(this.firestore, `properties/${id}`);
    return docData(property, { idField: '_id' });
  }

  async getPropertyModelRef(property: IProperty) {
    const storage = getStorage();
    const url = await getDownloadURL(ref(storage, property.model));
    return url;
  }

  async saveNewProperty(newProperty: Partial<IProperty>) {
    const propertiesCollectionRef = collection(this.firestore, 'properties');
    try {
      docData(await addDoc(propertiesCollectionRef, newProperty), {
        idField: '_id',
      }).subscribe((property) => {
        console.log(property);
      });
    } catch (err: any) {
      throw Error('An error has ocurred');
    }
  }
}
