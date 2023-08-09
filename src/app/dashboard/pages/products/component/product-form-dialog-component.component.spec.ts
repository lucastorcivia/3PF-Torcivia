import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormDialogComponent } from './product-form-dialog-component.component';

describe('ProductFormDialogComponent', () => {
  let component: ProductFormDialogComponent;
  let fixture: ComponentFixture<ProductFormDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormDialogComponent]
    });
    fixture = TestBed.createComponent(ProductFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
