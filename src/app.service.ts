import { Injectable } from '@nestjs/common';
import { add } from 'lodash-es';

@Injectable()
export class AppService {
  getHello(): string {
    let x = add(1, 1);
    return 'Hello World!';
  }
}
