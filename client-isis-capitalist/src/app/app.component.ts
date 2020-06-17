import { Component } from '@angular/core';
import { RestService } from './service/rest.service';
import { World, Product, Pallier } from './world';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  title = 'client-isis-capitalist';
  world: World = new World();
  server: string;

  constructor(private service: RestService) {
    this.server = service.getServer();
    service.getWorld().then(
    world => {
    this.world = world;
    });
    }
   

}


