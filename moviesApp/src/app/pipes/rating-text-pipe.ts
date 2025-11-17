import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingText'
})
export class RatingTextPipe implements PipeTransform {

   transform(value: number, maxStars: number = 5): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '☆☆☆☆☆';
    }

    const normalizedValue = value / 2;
    const fullStars = Math.floor(normalizedValue);
    const hasHalfStar = normalizedValue - fullStars >= 0.5;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    return '★'.repeat(fullStars) + 
           (hasHalfStar ? '½' : '') + 
           '☆'.repeat(emptyStars);
  }
}
