import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/world';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {
  /* Fait sans le TP */
  @Input() image: string;
  @Input() quantite: number;
  @Input() quantiteAchat: number;
  @Input() cout: number;
  @Output() newQuantite: number;
  @Output() newCout: number;

  croissance: number;
  coutCalcule: number;

  /* Provenant du TP */
  product: Product;
  @Input()
  set prod(value: Product) {
    this.product = value;
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
    this.emeraude = value;
    this.calcMaxCanBuy();
  }
  progressbarvalue = 0;
  lastupdate;
  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() onBuy: EventEmitter<Number> = new EventEmitter<Number>();



  constructor(

  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.quantiteAchat) {
    //   this.coutCalcule = (this.cout * this.croissance ^ (this.quantite + this.quantiteAchat)) / (1 - this.croissance);
    // }
  }

  ngOnInit(): void {
    //setInterval(() => { this.calcScore(); }, 100);
    this.croissance = 0;
    // this.calcMaxCanBuy();
    // this.coutCalcule = (this.product.cout * this.product.croissance ^ (this.product.quantite + this.quantiteAchat)) / (1 - this.croissance);
  }

  startFabrication() {
    this.product.timeleft = this.product.vitesse;
    this.lastupdate = Date.now();
  }

  calcScore() {
    if (this.product.timeleft == 0) {
    } else {
      const diffTimeLeft = (Date.now() - this.lastupdate) - this.product.timeleft;
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
      while ((this.product.cout * this.croissance ^ (this.product.quantite + quantiteAchatMultiplicateur)) < this.emeraude) {
        quantiteAchatMultiplicateur = quantiteAchatMultiplicateur + 1;
      }
      if (quantiteAchatMultiplicateur != 0) { quantiteAchatMultiplicateur - quantiteAchatMultiplicateur - 1; }
    }
    // if (this.product.croissance > 1) {
      // this.emeraude = (this.emeraude - this.product.cout * this.croissance ^ (this.product.quantite + quantiteAchatMultiplicateur)) / (1 - this.croissance);
    // }
    this.coutCalcule = this.product.cout * this.product.croissance ^ (this.product.quantite + quantiteAchatMultiplicateur);
    this.quantiteAchat = quantiteAchatMultiplicateur;

  }

  transaction() {
    // if (this.croissance > 1) {
    //   this.emeraude = (this.cout - this.cout * this.croissance ^ (this.quantite + this.quantiteAchat)) / (1 - this.croissance);
    // }
    this.product.cout = this.product.cout * this.product.croissance ^ (this.product.quantite + this.quantiteAchat);
    this.product.quantite = this.product.quantite + this.quantiteAchat;
    this.notifyProduction.emit(this.product);
    this.onBuy.emit(this.product.cout);
    // this.serviceSauvegarde.saveTransaction();
  }
}
