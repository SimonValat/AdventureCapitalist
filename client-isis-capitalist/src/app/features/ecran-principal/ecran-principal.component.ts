import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-ecran-principal',
  templateUrl: './ecran-principal.component.html',
  styleUrls: ['./ecran-principal.component.css']
})
export class EcranPrincipalComponent implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  listeMarchandise: Array<Marchandise>;
  multiplicateurAchat = 1;

  constructor() { }

  ngOnInit(): void {
    this.listeMarchandise = new Array<Marchandise>();
    for (let i = 0; i < 7; i++) {
      this.listeMarchandise.push(new Marchandise());
      this.listeMarchandise[i].prix = 7;
      this.listeMarchandise[i].quantite = 3;
    }
  }

  changerMulitplicateurAchat() {
    switch (this.multiplicateurAchat) {
      case this.multiplicateurAchat = 1:
        this.multiplicateurAchat = 10;
        break;
      case this.multiplicateurAchat = 10:
        this.multiplicateurAchat = 100;
        break;
      case this.multiplicateurAchat = 100:
        this.multiplicateurAchat = 1;
        break;
    }
  }

}

export class Marchandise {
  quantite: number;
  prix: number;
}
