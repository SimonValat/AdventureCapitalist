import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { World, Pallier, Product } from '../world';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private user : string;
  server = "http://localhost:8080/";

  getServer() : string {
    return this.server;
  }

  getUser() : string {
    return this.user
  }

  setUser(pUser : string) : void {
    this.user = pUser;
  }
 
  constructor(private http: HttpClient) { }

  // private setHeaders(user : string) : Headers {
  //   return new HttpHeaders( { "X-User" : user });

  // }

  getWorld(): Promise<World> {
    return this.http.get(this.server + "adventureisis/generic/world")
    .toPromise().catch(this.handleError);
   };
   

   private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
   }

}
