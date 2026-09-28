import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:5167/api/products';

  // Base state signals
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Filter state signals
  searchTerm = signal<string>('');
  selectedCategory = signal<string>('All');

  // Derived signal: Extracts unique categories whenever products signal updates
  categories = computed(() => {
    const allProducts = this.products();
    if (!allProducts || allProducts.length === 0) {
      return ['All'];
    }
    const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category)));
    return ['All', ...uniqueCategories];
  });

  // Derived signal: Filters products based on search term and selected category
  filteredProducts = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const category = this.selectedCategory();
    const currentProducts = this.products();

    return currentProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(term) ||
                            product.description.toLowerCase().includes(term);
      const matchesCategory = category === 'All' || product.category === category;

      return matchesSearch && matchesCategory;
    });
  });

  fetchProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load products from API.');
        this.loading.set(false);
        console.error(err);
      }
    });
  }
}