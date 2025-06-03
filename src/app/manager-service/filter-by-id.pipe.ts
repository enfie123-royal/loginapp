import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterById',
  standalone: true
})
export class FilterByIdPipe implements PipeTransform {
  transform(items: any[], id: number | string): any[] {
    if (!id) return items;
    return items.filter(item => item.id && item.id.toString().includes(id.toString()));
  }
}