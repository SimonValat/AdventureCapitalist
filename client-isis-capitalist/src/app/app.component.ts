import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { RestService } from './service/rest.service';
import { Product, World } from './world';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  constructor(
    private service: RestService,
    private cdr: ChangeDetectorRef) {
    this.server = service.getServer();
    service.getWorld().then(
      world => {
        this.world = world;
      });
  }

  title = 'CapitalismCraft';
  world: World;

  server: string;


  multiplicateurAchat = 1;
  qtmulti = '1';

  ngOnInit(): void {
  }

  changerMulitplicateurAchat() {
    switch (this.qtmulti) {
      case this.qtmulti = '1':
        this.qtmulti = '10';
        break;
      case this.qtmulti = '10':
        this.qtmulti = '100';
        break;
      case this.qtmulti = '100':
        this.qtmulti = 'Max';
        break;
      case this.qtmulti = 'Max':
        this.qtmulti = '1';
        break;
    }
  }

  onStartProduction(p: Product): void {
    this.service.putProduct(p);
  }

  onProductionDone(product: Product) {
    this.world.money += product.revenu * product.quantite;
    this.world.score += product.revenu * product.quantite;
    this.cdr.markForCheck();
  }

  onBuyDone(cout: number) {
    console.log('Argent à prélever :', cout);
    console.log('Argent en poche :', this.world.money);
    this.world.money = this.world.money - cout;
    console.log('Argent après achat :', this.world.money);
    this.cdr.markForCheck();
  }
}




