import { ArgumentMetadata, Pipe, PipeTransform } from '@nestjs/common';

@Pipe()
export class UserbyidpipePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
