import { Component,Inject,inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../models';

@Component({
  selector: 'app-product-form-dialog-component',
  templateUrl: './product-form-dialog-component.component.html',
  styleUrls: ['./product-form-dialog-component.component.scss']
})
export class ProductFormDialogComponent {
  editingProduct? : Product;
  nameControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.minLength(2),
  ]);
  priceControl = new FormControl<number | null>(null, [Validators.required]);
  descriptionControl = new FormControl<string | null>(null, [Validators.required]);
  durationControl = new FormControl<number | null>(null, [Validators.required]);

  productForm = new FormGroup({
    name: this.nameControl,
    price: this.priceControl,
    description: this.descriptionControl,
    duration: this.durationControl
  })

  constructor(
    private dialogRef: MatDialogRef<ProductFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data?: Product
  ){
    if(this.data){
      this.editingProduct = this.data;
      this.nameControl.setValue(this.data.name);
      this.descriptionControl.setValue(this.data.description);
      this.priceControl.setValue(this.data.price);
      this.durationControl.setValue(this.data.duration);
    }
  }
  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.productForm.value);
    }
  }
}
