import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'truncate',
 standalone: true,
})

export class TruncatePipe implements PipeTransform {

transform(value: string, labelOffset: [number]): string {
        const limit = 36 - labelOffset[0]
        return value?.length > limit ? value?.substring(0, limit) + '...' : value;
   }
}