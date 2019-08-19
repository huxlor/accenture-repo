import { Component, OnInit } from '@angular/core';
import { Router, RouteConfigLoadEnd } from '@angular/router';
import { UserModel } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  forma: FormGroup;
  user = new UserModel();

  constructor( private router: Router, private usersService: UsersService,
               public toastController: ToastController, public loadingController: LoadingController ) {

      // Enviamos el objeto con la estructura del formulario y sus reglas de validacion
      this.forma = new FormGroup({
        firstname: new FormControl('', Validators.required),
        lastname: new FormControl('', Validators.required),
        identification: new FormControl('', Validators.required),
        birthdate: new FormControl('', Validators.required)
      });

   }

  ngOnInit() {
  }

  registration( form ) {

    let userExist = false;
    const birthDateField = this.forma.value.birthdate;

    // Si el formulario no esta valido no haga nada.
    if ( form.invalid ) {
      console.warn('Invalid Form');
      this.presentToast('Please fill in all required fields (*)');
      return;
    } else if ( !this.formatBirthDate(birthDateField )) {
      console.warn('Invalid Birthdate');
      this.presentToast('Are you over 18 years old?');
      return;
    }

    // Se usa el servicio del get al click del formulario.
    this.usersService.getUsers().subscribe( resp => {
      // this.presentLoading();
      resp.some(e => {

        const baseDataId = e.identification;
        // tslint:disable-next-line:triple-equals
        if (baseDataId) {
          const userId = this.user.identification.toString();
          const baseDataIdString = baseDataId.toString();
          if (baseDataIdString === userId) {
            userExist = false;
          } else {
            userExist = true;
          }
          return (baseDataIdString === userId);
        }
      });
      if (userExist) {
          // Se usa el servicio del post al click del formulario.
          this.usersService.registerUser( this.user ).subscribe((r) => {
            this.goTo('/home', r);
            form.reset();
          });

      } else {
        // Aviso usuario ya registrado.
        console.warn('Invalid ID');
        this.presentToast('User ID already registered');
      }
     });
  }

  // Boton back arrow
  goTo( url: string, query?: string ) {
    this.router.navigate([ url ], { queryParams: {user: query} });
  }

  async presentToast( text: string ) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: 'tertiary'
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  // Limpiar Fecha de Nacimiento y condicion mayor de 18
  private formatBirthDate( date: string ) {

    let over18 = false;
    const cutDateUser = date.split('T');
    const arrayDateUser = cutDateUser[0];
    const yearUser = arrayDateUser.split('-')[0];

    const actualDate = new Date();
    const actualYear = actualDate.getFullYear();

    // tslint:disable-next-line:prefer-const
    let birthYear = actualYear - parseInt(yearUser, 10);

    if (birthYear >= 18) {
      over18 = true;
    }

    return over18;
  }

}
