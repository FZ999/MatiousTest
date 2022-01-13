import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  searchText= "";
  items: Product[]= [];
  resultItems: Product[]= [];
  n: any;
  a: any;
  b: any;
  triPrice: any;
  triRating: any;
  loaded: boolean;
  categories: any;
  constructor(
    private itemsService: ProductService ) {
    this.loaded = false;
  }

  ngOnInit(): void {
    this.getProducts(this.triPrice);
  
  }
 
  getProducts(tri: any): void {
    
    this.loaded = false;
    this.itemsService.getProducts('https://fakestoreapi.com/products')
      .subscribe(
        items => {
          const k= [""];
          this.categories= [];
          for (let i of Object.entries(items)) { 
          { 
            k.push(i[1].category);
            this.categories = [...new Set(k)];}
            };
          
          this.items= this.resultItems= Object.values(items);
          this.n= Object.keys(items).length/5;
          this.a=0;
          this.b=this.n +1;
          this.loaded = true;
        });
  }
  inc() {
    this.a= this.b;
    this.b= this.b+ this.n +1;
  }
  dec() {
    
    this.b= this.a;
    this.a= this.a - this.n -1;
    
  }
  searchProducts() {
    this.resultItems= this.items.filter((item) => item.category.toLowerCase().includes(this.searchText.toLowerCase()))

  }

}
