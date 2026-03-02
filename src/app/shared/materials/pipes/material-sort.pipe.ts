import { Pipe, PipeTransform } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { MaterialCount } from '../components/material-list/material-list.component';

@Pipe({
  name: 'materialSort',
})
export class MaterialSortPipe implements PipeTransform {
  transform(
    value: MaterialCount[] | null,
    sortProp: keyof MaterialCount | string | undefined,
    dir: SortDirection | undefined
  ): MaterialCount[] {
    if (value) {
      // return value unmodified if no sort column
      if (sortProp == undefined) return value;

      const bDir = dir == 'desc' ? -1 : 1;
      return value.sort((a, b) => {
        switch (sortProp) {
          case 'id':
            return a.id.localeCompare(b.id) * bDir;
          case 'description':
            return a.description.localeCompare(b.description) * bDir;
          case 'count':
            if (a.count != undefined && b.count != undefined) {
              return a.count - b.count * bDir;
            } else return 0;
          case 'name':
          default:
            return a.name.localeCompare(b.name) * bDir;
        }
      });
    }
    return [];
  }
}
