import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods } from 'src/data';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/model/constants/url';
import { food } from '../shared/model/Food';

interface Tag {
  id: number;
  name: string;
  description: string;

}

@Injectable({
  providedIn: 'root'
})

export class FoodService {


  constructor(private httpClient: HttpClient) { }

  getAll():Observable<food[]>{
    return this.httpClient.get<food[]>(FOODS_URL)
  }

  // search food
  getAllFoodBySearchTerm(searchTerm:string){
    return this.httpClient.get<food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  

  // get All tag
  getAllTags():Observable<Tag[]>{
    return this.httpClient.get<Tag[]>(FOODS_TAGS_URL)
  }
  

  //  get food by tags
   getAllFoodByTag(tag:string):Observable<food[]>{
    return tag === "All"? this.getAll():this.httpClient.get<food[]>(FOODS_BY_TAG_URL+ tag)
  }

  // get food by Id
  getFoodById(foodId:string):Observable<food>{
    return this.httpClient.get<food>(FOODS_BY_ID_URL +foodId)
  }

 
}
