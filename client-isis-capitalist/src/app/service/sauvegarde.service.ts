import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SauvegardeService {

  constructor() { }

  saveTransaction() {
    console.log('saveTransaction');
  }
}
