import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphabet'
})
export class AlphabetPipe implements PipeTransform {
  alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];
  transform(index: any, ...args: any[]): any {
    return this.alphabet[index];
  }

}
