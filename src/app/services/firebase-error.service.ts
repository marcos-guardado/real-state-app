import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebaseErrorCode';

@Injectable({
  providedIn: 'root'
})
export class FirebaseErrorService {

  constructor() { }

  codeError(code: string) {

    switch (code) {
      case FirebaseCodeErrorEnum.EmailAlreadyInUse:
        return 'El usuario ya existe';
      case FirebaseCodeErrorEnum.WeakPassword:
        return 'La constraseña es muy debil';
      case FirebaseCodeErrorEnum.InvalidEmail:
        return 'El email es invalido';
      case FirebaseCodeErrorEnum.WrongPassword:
        return 'La constraseña es incorrecta';
      case FirebaseCodeErrorEnum.UserNotFound:
        return 'El usuario no existe';
      default:
        return 'Error desconocido';
    }
  }
}
