import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colors',
  pure: false
})
export class ColorsPipe implements PipeTransform {

  transform(products: any[], sortColor: any[]): any {
    const newP = [];
    if (!products) {
      return [];
    }
    if (!sortColor || sortColor.length === 0) {
      return products;
    }
    products.filter(product => {
      sortColor.map(search => {
        if (product.color[0].name.toLowerCase().includes(search.toLowerCase())) {
          newP.push(product);
        }
      });
    });
    products = newP;
    return products;
  }

}
