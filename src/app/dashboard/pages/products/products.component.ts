import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './models';
import { ProductService } from './product.service';
import { Observable, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormDialogComponent } from './component/product-form-dialog-component.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
  ]
})
export class ProductsComponent implements OnInit{
  public data$: Observable<Product[]>;

  public displayedColumns = ['id', 'name','description','duration','price', 'actions'];

  constructor(private productService: ProductService,private matDialog: MatDialog) {
    this.data$ = this.productService.getProducts();
  }

  ngOnInit(): void {
    this.productService.loadProducts();
  }

  onCreate(): void {
    this.matDialog
      .open(ProductFormDialogComponent)
      .afterClosed()
      .subscribe({
        next: (v) => {
          console.log(v)
          if (v) {
            this.productService.createProduct({
              name: v.name,
              description: v.description,
              price: v.price,
              duration: v.duration,
            });
          }
        },
      });
  }

  onDeleteUser(productToDelete: Product): void {
    if (confirm(`¿Está seguro de eliminar ${productToDelete.name}?`)) {
      this.productService.deleteProductById(productToDelete.id);
    }
  }
  onEditProduct(productToEdit: Product): void {
    console.log(productToEdit)
    this.matDialog
      // ABRO EL MODAL
      .open(ProductFormDialogComponent, {
        // LE ENVIO AL MODAL, EL USUARIO QUE QUIERO EDITAR
        data: productToEdit,
      })
      // Y DESPUES DE QUE CIERRE
      .afterClosed()
      // HAGO ESTO...
      .subscribe({
        next: (productUpdated) => {
          if (productUpdated) {
            this.productService.updateProductrById(productToEdit.id, productUpdated);
          }
        },
      });
  }

  onDelete(id: number): void {
    this.productService.deleteProductById(id);
  }
}
