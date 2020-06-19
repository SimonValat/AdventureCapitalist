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
  world: World = new World();

  server: string;


  multiplicateurAchat = 1;
  qtmulti = '1';

  ngOnInit(): void {

    console.log(this.world.products);
    
    this.world.products.product = new Array<Product>();
    // BLE
    this.world.products.product.push(new Product());
    this.world.products.product[0].cout = 7;
    this.world.products.product[0].quantite = 3;
    this.world.products.product[0].logo = 'ble.png';
    // CUIR
    this.world.products.product.push(new Product());
    this.world.products.product[1].cout = 7;
    this.world.products.product[1].quantite = 3;
    this.world.products.product[1].logo = 'cuir.png';
    // IRON
    this.world.products.product.push(new Product());
    this.world.products.product[2].cout = 7;
    this.world.products.product[2].quantite = 3;
    this.world.products.product[2].logo = 'iron.png';
    // OR
    this.world.products.product.push(new Product());
    this.world.products.product[3].cout = 7;
    this.world.products.product[3].quantite = 3;
    this.world.products.product[3].logo = 'or.png';
    // DIAMANT
    this.world.products.product.push(new Product());
    this.world.products.product[4].cout = 7;
    this.world.products.product[4].quantite = 3;
    this.world.products.product[4].logo = 'diamant.png';
    // PERLE ENDER
    this.world.products.product.push(new Product());
    this.world.products.product[5].cout = 7;
    this.world.products.product[5].quantite = 3;
    this.world.products.product[5].logo = 'perle-ender.png';

    this.world.money = 10;

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

  onProductionDone(product: Product) {
    this.world.money += product.cout;
    this.world.score += product.cout;
    this.cdr.markForCheck();
  }

  onBuyDone(money: number) {
    console.log('Argent à prélever :', money);
    console.log('Argent en poche :', this.world.money);
    this.world.money = this.world.money - money;
    console.log('Argent après achat :', this.world.money);
    this.cdr.markForCheck();
  }
}



