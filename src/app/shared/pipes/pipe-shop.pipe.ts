import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeShop',
  pure: false
})
export class PipeShopPipe implements PipeTransform {

  transform(products: any[], categoryFilter: any[]): any {
    const newP = [];
    if (!products) {
      return [];
    }
    if (!categoryFilter || categoryFilter.length === 0) {
      return products;
    }
    products.filter(product => {
      categoryFilter.map(search => {
        if (product.category.toLowerCase().includes(search.toLowerCase())) {
          newP.push(product);
        }
      });
    });
    products = newP;
    return products;
  }

}
