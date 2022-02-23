import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryAPIService {

  readonly Product_CategoryAPIUrl="https://localhost:44343/api";

  constructor(private http:HttpClient ) { }
 
   //Product
  getProductList():Observable<any[]>
  {
    return this.http.get<any>(this.Product_CategoryAPIUrl + '/Product')
  }
  addProduct(data:any){
    return this.http.post(this.Product_CategoryAPIUrl + '/Product', data);
  }
  updateProduct(id: number|string, data:any){
    return this.http.put(this.Product_CategoryAPIUrl + `/Product/${id}`, data);
  }
  deleteProduct(id:number|string){
    return this.http.delete(this.Product_CategoryAPIUrl + `/Product/`+id)
  }

  //Category 

  getCategoryList():Observable<any[]>
  {
    return this.http.get<any>(this.Product_CategoryAPIUrl + '/Category')
  }
  addCategory(data:any){
    return this.http.post(this.Product_CategoryAPIUrl + '/Category', data);
  }
  updateCategory(id: number, data:any){
    return this.http.put(this.Product_CategoryAPIUrl + `/Category/${id}`, data);
  }
  deleteCategory(id:number){
    return this.http.delete(this.Product_CategoryAPIUrl + `/Category/${id}; `)
  }
}
