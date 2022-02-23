import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCategoryAPIService } from '../services/product-category-api.service'; 

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})

export class AddEditProductComponent implements OnInit {

  productList$!: Observable<any[]>;
  categoryList$!: Observable<any[]>;

  constructor(private service:ProductCategoryAPIService) { }

  @Input() product:any;
  id: number = 0;
  nameProduct:string="";
  idCategory: number=0;

  @Input() category:any;
  idC: number = 0;
  nameCategory:string="";

  ngOnInit(): void {
    this.id = this.product.id;
    this.nameProduct=this.product.nameProduct;
    this.idCategory = this.product.idCategory;
    this.productList$ = this.service.getProductList();
    this.categoryList$ = this.service.getCategoryList();
  }

  addProduct() {
    var product = {
      nameProduct:this.nameProduct,
      idCategory:this.idCategory
    }
    this.service.addProduct(product).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })
  }

  addCategory() {
    var category = {
      nameCategory:this.nameCategory,
      idC:this.idC
    }
    this.service.addCategory(category).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showAddSuccess = document.getElementById('add-success-alert');
      if(showAddSuccess) {
        showAddSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showAddSuccess) {
          showAddSuccess.style.display = "none"
        }
      }, 4000);
    })
  }
  
  updateProduct() {
    var product = {
      id: this.id,
      nameProduct:this.nameProduct,
      idCategory:this.idCategory
    }
    var id:number = this.id;
    this.service.updateProduct(id,product).subscribe(res => {
      var closeModalBtn = document.getElementById('add-edit-modal-close');
      if(closeModalBtn) {
        closeModalBtn.click();
      }

      var showUpdateSuccess = document.getElementById('update-success-alert');
      if(showUpdateSuccess) {
        showUpdateSuccess.style.display = "block";
      }
      setTimeout(function() {
        if(showUpdateSuccess) {
          showUpdateSuccess.style.display = "none"
        }
      }, 4000);
    })

  }

}
