import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private endPoint = 'https://testbankapi.firebaseio.com';

  constructor( private http: HttpClient ) { }

  // Registra usuarios nuevos con un post a la base de datos.
  registerUser( user: UserModel ) {
    return this.http.post( `${this.endPoint}/clients.json`, user).pipe(
      map( (e: any) => {
        return e.name;
      })
    );
  }

  // Obtiene todos los usuarios de la base de datos.
  getUsers() {
    return this.http.get( `${this.endPoint}/clients.json`).pipe(
      map( this.createArray )
    );
  }

  // Obtiene un solo un suario por id de referenci
  getUser( id: string) {
    return this.http.get(`${this.endPoint}/clients/${id}.json`);
  }

  // Convierte la respuesta de Firebase en un Arreglo que se pueda tratar.
  private createArray( usersObj: object) {
    const users: UserModel[] = [];

    Object.keys(usersObj).forEach( e => {
      const user: UserModel = usersObj[e];
      users.push( user );
    });

    // Si el objeto viene nulo retorne un arreglo vacio.
    if (usersObj == null ) {
      return [];
    }

    return users;

  }

}
