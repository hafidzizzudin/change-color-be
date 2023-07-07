import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private _colorList = ['orangered', 'red', 'green', 'blue', '#452'];

  getRandomColor(): string {
    const index = Math.floor(Math.random() * this._colorList.length);

    console.log(index, this._colorList[index]);

    return this._colorList[index];
  }
}
