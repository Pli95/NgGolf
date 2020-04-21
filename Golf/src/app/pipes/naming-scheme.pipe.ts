import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'namingScheme'
})
export class NamingSchemePipe implements PipeTransform {

  transform(name: string, addOn: string) {
    return `${addOn} ${name}`;
  }

}
