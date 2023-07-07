import { Injectable } from '@nestjs/common';

@Injectable()
export class ColorService {
  getHello(): string {
    return 'Hello World!';
  }
}
