import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
import { food } from 'src/app/shared/model/Food';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods:food[] = []
  constructor(private api: FoodService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      if (params.searchTerm) {
        this.api.getAllFoodBySearchTerm(params.searchTerm).subscribe(result => {
          this.foods = result;
        });
      } else {
        this.api.getAll().subscribe(result => {
          this.foods = result;
        });
      }
    });
  }

  ngOnInit(): void {

  }

}
