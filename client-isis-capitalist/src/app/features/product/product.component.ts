import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/world';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  /* Fait sans le TP */
  @Input() image: string;
  @Input() quantite: number;
  @Input() quantiteAchat: number;
  @Input() cout: number;
  @Output() newQuantite: number;
  @Output() newCout: number;

  croissance: number;
  coutCalcule: number;
  etatBouton: boolean;

  /* Provenant du TP */
  product: Product;
  @Input()
  set prod(value: Product) {
    this.product = value;
    this.lastupdate = Date.now();
  }
  _qtmulti: string;
  @Input()
  set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this.product) {
      this.calcMaxCanBuy();
    }
  }
  emeraude: number;
  @Input()
  set money(value: number) {
    if (this.product) {
      this.emeraude = value;
      this.calcMaxCanBuy();
    }
  }
  progressbarvalue = 0;
  lastupdate;
  @Output() startProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() onBuy: EventEmitter<Number> = new EventEmitter<Number>();



  constructor(

  ) { }

  ngOnInit(): void {
    setInterval(() => { this.calcScore(); }, 100);
    this.getEtatBouton();

  }

  startFabrication() {
    // this.product.timeleft = this.product.vitesse;
    // this.lastupdate = Date.now();
    if (this.product.timeleft > 0 || this.product.quantite == 0) {
      return;
    }
    this.product.timeleft = this.product.vitesse;
    this.lastupdate = Date.now();
    if (!this.product.managerUnlocked) {
      this.startProduction.emit(this.product);
    }
  }

  calcScore() {

    if (this.product.timeleft == 0) {
    } else {
      const diffTimeLeft = this.product.timeleft - (Date.now() - this.lastupdate);
      if (diffTimeLeft <= 0) {
        this.product.timeleft = 0;
        this.progressbarvalue = 0;
        // on prévient le composant parent que ce produit a généré sonrevenu.
        this.notifyProduction.emit(this.product);

      } else {
        this.progressbarvalue = ((this.product.vitesse - this.product.timeleft) / this.product.vitesse) * 100;
      }
    }

  }

  calcMaxCanBuy(): void {
    let quantiteAchatMultiplicateur = 0;
    if (this._qtmulti !== 'Max') {
      quantiteAchatMultiplicateur = Number.parseInt(this._qtmulti);
    } else {
      quantiteAchatMultiplicateur = Math.floor(
        Math.log(-(this.emeraude / this.product.cout - 1 / (1 - this.product.croissance)) * (1 - this.product.croissance))
        / Math.log(this.product.croissance)
      );
    }
    this.quantiteAchat = quantiteAchatMultiplicateur;
    this.coutCalcule = this.getPrix(),
    this.getEtatBouton();

  }

  getCout(): number {
    if (this.quantiteAchat > 0) {
      return this.product.cout * (this.product.croissance ** (this.quantiteAchat));
    }
  }

  getPrix(): number {
    return (
      (this.product.cout * (1 - this.product.croissance ** this.quantiteAchat)) /
      (1 - this.product.croissance)
    );
  }

  transaction() {
    this.product.quantite = this.product.quantite + this.quantiteAchat;
    console.log('cout du produit a l\'achat: ', this.getPrix());
    this.onBuy.emit(this.getPrix());
    this.product.cout = this.getCout();
  }

  getEtatBouton() {
    if (this.coutCalcule < this.emeraude) {
      this.etatBouton = false;
    } else {
      this.etatBouton = true;
    }
  }
}
