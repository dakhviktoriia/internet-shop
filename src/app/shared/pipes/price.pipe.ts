import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  pure: false
})
export class PricePipe implements PipeTransform {

  transform(products: any[], minValue: any, maxValue: any): any {

    console.log(maxValue, minValue);

    let filterPRod = [];
    filterPRod = products.filter(product => {
      return parseInt(product.price) >= minValue
        && parseInt(product.price) <= maxValue
    });

    products = filterPRod;
    return products;



  }

}
