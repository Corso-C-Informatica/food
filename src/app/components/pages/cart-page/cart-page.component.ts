import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/model/Cart';
import { CartItem } from 'src/app/shared/model/CartItem';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})

/*/
cart= carello della spesa , con questo componente gestico la logistica del carello 
Quando il carrello viene modificato il componente aggiorna l'attributo "cart"
ex: vengono aggiunti o rimossi degli elementi (veranno chiamati due metodi )

*/
export class CartPageComponent {
  cart!:Cart

  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart)=> {
      this.cart = cart; 
      /*
      getCartObservable" del servizio "CartService" serve ad 
      ottenere un'istanza del carrello e ascoltare gli eventuali cambiamenti 

      /*/
    })
  }

  ngOnInit(): void{

  }
  /*/
  primo metodo che serve per  rimuovere dal carrello 
  */

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.food.id);
  }
  /*
  /"changeQuantity" che cambia la quantità d
  i un elemento nel carrello utilizzando il
 metodo "changeQuantity" del servizio "CartService"
  */
  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }


}
