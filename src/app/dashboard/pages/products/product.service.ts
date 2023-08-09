import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, delay, of } from 'rxjs';
import { CreateProductData, Product, UpdateProductData } from './models';
import { NotifierService } from 'src/app/core/services/notifier.service';

const PRODUCTS_DB: Observable<Product[]> = of([
  {
    id: 1,
    name: 'JS',
    description: 'javascript',
    price: 5000,
    duration: 30
  },
  {
    id: 2,
    name: 'PHP',
    description: 'Conexiones con bases',
    price: 6000,
    duration: 45
  },
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _product$ = new BehaviorSubject<Product[]>([]);
  private product$ = this._product$.asObservable();

  constructor(private notifier: NotifierService) {}

  getProducts(): Observable<Product[]> {
    return this.product$;
  }

  loadProducts(): void {
    PRODUCTS_DB.subscribe({
      next: (productFromDb) => this._product$.next(productFromDb),
    });
  }

  createProduct(product: CreateProductData): void {
    // TAKE 1 = solo quiero recibir una emision
    // SUPER IMPORTANTE PORQUE DE LO CONTRARIO,
    // CREARIAN UN BUCLE INFINITO
    this.product$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._product$.next([
          ...arrayActual,
          { ...product, id: arrayActual.length + 1 },
        ]);
        this.notifier.showSuccess('Producto creado');
      },
    });
  }

  updateProductrById(id: number, productoActualizado: UpdateProductData): void {
    this.product$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._product$.next(
          arrayActual.map((u) =>
            u.id === id ? { ...u, ...productoActualizado } : u
          )
        );
        this.notifier.showSuccess('Curso Actualizado');
      },
    });
  }

  deleteProductById(id: number): void {
    this._product$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._product$.next(arrayActual.filter((u) => u.id !== id));
        this.notifier.showSuccess('Curso Eliminado');
      },
    });
  }
}
