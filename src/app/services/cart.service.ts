import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/model/Cart';
import { food } from '../shared/model/Food';
import { CartItem } from '../shared/model/CartItem';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = new Cart();
  private cartSubject:BehaviorSubject<Cart> =new BehaviorSubject(this.cart)
  constructor() { }

  // questo metodo aggiunge un elemento al carrelo
  // e se questo elemento esite di già non lo aggiunge 
  addToCart(food:food):void{
    let cartItem= this.cart.items.find((item: { food: { id: string; }; }) => item.food.id === food.id)
    if(cartItem)
    return;

    this.cart.items.push(new CartItem(food))
    this.setCartToLocalStorage();
  }

  // questo metodo rimuove un elemento dal carello della spesa
  // usando l'id del prodotto come parametro 
  removeFromCart(foodId:string):void{
    this.cart.items = this.cart.items.filter((item: { food: { id: string; }; }) => item.food.id != foodId)
    this.setCartToLocalStorage();
  }

  //questo metodo modifica la quantità di un prodotto già esistente nel carrello usando l'id  
  //ma a differenza della "remove" qua si usa anche la nuova quantià come parametro 
  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.items.find((item: { food: { id: string; }; }) => item.food.id === foodId);
    if(!cartItem)
    return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  // questo metodo in sostanza elimina il carrello 
  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  // restituisce un observable che emette un flusso di dati del carrello ogni volta che il carrello viene modificato.
  //
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  //  Aggiorna i dati del carrello nel localStorage 
  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum: any, currentItem: { price: any; }) => prevSum + currentItem.price, 0)
    this.cart.totalCount = this.cart.items.reduce((prevSum: any, currentItem: {
      quantity: any; price: any;
}) => prevSum + currentItem.quantity, 0)

// viene utilizzato per salvare i dati del carrello corrente nel localStorage del browser
const cartJson = JSON.stringify(this.cart); // questa funzione converte l'oggetto "cart" in una stringa JSON
localStorage.setItem('Cart', cartJson);
this.cartSubject.next(this.cart)
  }

  // 
  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson?JSON.parse(cartJson): new Cart();
  }

  

}

