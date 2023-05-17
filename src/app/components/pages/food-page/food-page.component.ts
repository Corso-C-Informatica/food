import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/model/Food';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: food;

  constructor(
    private api: FoodService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.api.getFoodById(params.id).subscribe(result => {
        this.food = result;
      });
    });
  }

  addToCart(): void {
    this.cartService.addToCart(this.food);
  }
}
