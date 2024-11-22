import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'truncate',
 standalone: true,
})

export class TruncatePipe implements PipeTransform {

transform(value: string | undefined, labelOffset: [number]): string {
        if(!value) {
            return ''
        }
        const limit = 34 - labelOffset[0]
        return value?.length > limit ? value?.substring(0, limit) + '...' : value;
   }
}