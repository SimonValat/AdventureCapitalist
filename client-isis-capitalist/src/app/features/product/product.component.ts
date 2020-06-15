import { Component, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnChanges {
  @Input() image: string;
  @Input() emeraude: number;
  @Input() quantite: number;
  @Input() quantiteAchat: number;
  @Input() cout: number;
  @Output() newQuantite: number;
  @Output() newCout: number;

  croissance: number;
  coutCalcule: number;



  constructor(
    
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.quantiteAchat) {
      this.coutCalcule = (this.cout * this.croissance ^ (this.quantite + this.quantiteAchat)) / (1 - this.croissance);
    }
  }

  ngOnInit(): void {
    this.croissance = 0;
    this.coutCalcule = (this.cout * this.croissance ^ (this.quantite + this.quantiteAchat)) / (1 - this.croissance);
  }

  transaction() {
    if (this.croissance > 1) {
      this.emeraude = (this.cout - this.cout * this.croissance ^ (this.quantite + this.quantiteAchat)) / (1 - this.croissance);
    }
    this.newCout = this.cout * this.croissance ^ (this.quantite + this.quantiteAchat);
    this.newQuantite = this.quantite + this.quantiteAchat;
    //this.serviceSauvegarde.saveTransaction();
  }
}
