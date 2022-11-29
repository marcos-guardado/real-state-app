import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validateRole',
})
export class ValidateRolePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
