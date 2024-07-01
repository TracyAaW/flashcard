import { Injectable } from '@angular/core';
import { Observable, from, map,  toArray } from 'rxjs';
import { TestItem, Option } from './app.models';
import { Test } from './app.constants';

@Injectable({ providedIn: 'root' })
export class AppService {

  tests$: Observable<TestItem[]> = from(Test).pipe(
    map((test: TestItem) => ({ ...test, options: this.shuffleArray(test.options) })),
    toArray(),
  )

  makeSelection(option: Option) {
  }

  makeSubmission() {
  }

  reset(newTest: number) {

  }

  setNextTest(val: number) {
  }

  private shuffleArray(array: any[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  }
}
