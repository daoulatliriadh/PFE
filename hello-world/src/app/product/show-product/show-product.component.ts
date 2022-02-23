import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategoryAPIService } from '../services/product-category-api.service'; 

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
/*@Component({
  selector: 'app-add-edit-product',
  templateUrl: '../add-edit-product/add-edit-category.component.html',
  styleUrls: []
})*/

export class ShowProductComponent implements OnInit {

  productList$!:Observable<any[]>;
  categoryList$!:Observable<any[]>;
  categoryList:any=[];

  // Map to display data associate with foreign keys
  categoryMap:Map<number, string> = new Map()

  constructor(private service:ProductCategoryAPIService) { }

  ngOnInit(): void {
    this.productList$ = this.service.getProductList();
    this.categoryList$ = this.service.getCategoryList();
    this.refreshCategoryMap();
  }

  // Variables (properties)
  modalTitle:string = '';
  activateAddEditProductComponent:boolean = false;
  activateAddEditCategoryComponent:boolean=false;
  product:any;
  category:any;

  modalAddProduct() {
    this.product = {
      id:0,
      nameProduct:null,
      idCategory:0,
    }
    this.modalTitle = "Add Product";
    this.activateAddEditProductComponent = true;
  }
  modalAddCategory() {
    this.category = {
      id:0,
      nameCategroy:null
    }
    this.modalTitle = "Add Category";
    this.activateAddEditCategoryComponent = true;
  }

  modalEdit(item:any) {
    this.product = item;
    this.modalTitle = "Update Product";
    this.activateAddEditProductComponent = true;
  
  }

  delete(item:any) {
    if(confirm(`Are you sure you want to delete product ${item.id}?`)) {
      this.service.deleteProduct(item.id).subscribe(res => {
        var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showDeleteSuccess = document.getElementById('delete-success-alert');
      if(showDeleteSuccess) {
        showDeleteSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showDeleteSuccess) {
          showDeleteSuccess.style.display = "none"
        }
      }, 4000);
      this.productList$ = this.service.getProductList();
      })
    }
  }

  modalClose() {
    this.activateAddEditProductComponent = false;
    this.productList$ = this.service.getProductList();
    this.categoryList$ = this.service.getCategoryList();
  }

  refreshCategoryMap() {
    this.service.getCategoryList().subscribe(data => {
      this.categoryList = data;

      for(let i = 0; i < data.length; i++)
      {
        this.categoryMap.set(this.categoryList[i].id, this.categoryList[i].nameCategory);
      }
    })
  }

  
}