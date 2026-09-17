import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from './services/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.fetchProducts();
  }
}
