import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductFormDialogComponent } from './component/product-form-dialog-component.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormDialogComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
  ]
})
export class ProductsModule { }
