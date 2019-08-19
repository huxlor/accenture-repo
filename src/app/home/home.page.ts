import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../services/users.service';
import { UserModel } from '../models/user.model';
import { AlertController } from '@ionic/angular';
import { Router, RouteConfigLoadEnd } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user = new UserModel();

  constructor( private userService: UsersService, public toastController: ToastController,
               private route: ActivatedRoute, public alertController: AlertController,
               private router: Router ) {
    this.presentToast('Successful user registration.');
   }

  ngOnInit() {
    const urlParam: string = this.route.snapshot.queryParamMap.get('user');
    // Obtiene la informacion del usuario registrado
    this.userService.getUser(urlParam).subscribe( (r: UserModel) => {
      this.user = r;
    });

  }

  exitButton() {
    this.presentAlertMultipleButtons();
  }

  async presentToast( text: string ) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: 'tertiary'
    });
    toast.present();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Log out',
      subHeader: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel'
        }, {
          text: 'Logout',
          handler: () => {
            this.router.navigate(['/intro']);
          }
        }
      ]
    });

    await alert.present();
  }

}
