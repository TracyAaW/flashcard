import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, filter, from, map,  scan,  startWith,  tap,  toArray, withLatestFrom, zip } from 'rxjs';
import { TestItem, Option, Score } from './app.models';
import { Test } from './app.constants';

@Injectable({ providedIn: 'root' })
export class AppService {

  tests$: Observable<TestItem[]> = from(Test).pipe(
    map((test: TestItem) => ({ ...test, options: this.shuffleArray(test.options) })),
    toArray(),
  )

  testLength$: Observable<number> = this.tests$.pipe(
    map((tests: TestItem[]) => tests.length)
  );

  private currentTestItemSubject = new BehaviorSubject<number>(0);
  public currentTestItem$: Observable<number> = this.currentTestItemSubject.asObservable()

  private selectedOptionSubject = new BehaviorSubject<number>(0);
  public selectedOption$: Observable<number> = this.selectedOptionSubject.asObservable();

  private submittedResultSubject = new BehaviorSubject<boolean>(false);
  public submittedResult$: Observable<boolean> = this.submittedResultSubject.asObservable();

  private isResettingSubject = new BehaviorSubject<boolean>(false);
  public isResetting$: Observable<boolean> = this.isResettingSubject.asObservable();

  private isTestCompleteSubject = new BehaviorSubject<boolean>(false);
  public isTestComplete$: Observable<boolean> = this.isTestCompleteSubject.asObservable();

  isLast$: Observable<boolean> = combineLatest([
    this.testLength$,
    this.currentTestItem$,
    this.submittedResult$
  ]).pipe(
    filter(([testLength, currentTestItem, submitted]: [number, number, boolean]) => (testLength === (currentTestItem + 1)) && submitted),
    map(() => true),
    startWith(false)
  )

  reset$: Observable<null> = zip(
    this.currentTestItem$.pipe(filter(c => c >= 0)),
    this.selectedOption$.pipe(filter(s => s === 0)),
    this.submittedResult$.pipe(filter(s => s === false)),
  ).pipe(
    map(() => null),
    tap(() => this.isResettingSubject.next(false)),
  )
  
  userTest$: Observable<TestItem> = combineLatest([
    this.currentTestItem$,
    this.selectedOption$,
    this.submittedResult$,
    this.reset$
  ]).pipe(
    withLatestFrom(this.tests$, this.isResetting$),
    filter(([[currentTestItem, selection, submitted, _], tests, isResetting]: [[number, number, boolean, null], TestItem[], boolean]) => !isResetting),
    scan((updatedTestItem: TestItem, [[currentTestItem, selection, submitted, _], tests, resetting]: [[number, number, boolean, null], TestItem[], boolean]) => {
      if (!Object.keys(updatedTestItem).length || currentTestItem !== (updatedTestItem.qId - 1)) return tests[currentTestItem];

      let updatedTest: TestItem;

      if (submitted) {

        const correct = updatedTestItem.options.every(opt => (opt.isCorrect && opt.isSelected) || (!opt.isCorrect && !opt.isSelected));

        updatedTest = { ...updatedTestItem, result: correct, submitted: true }

      } else {

        const updatedOptions: Option[] = updatedTestItem.options.reduce((acc: Option[], curr: Option) => {
          return [
            ...acc,
            curr.optId === selection ? { ...curr, isSelected: !curr.isSelected } : curr
          ]
        }, []);

        const someSelected = updatedOptions.some(opt => opt.isSelected);

        updatedTest = { ...updatedTestItem, options: updatedOptions, selectionsMade: someSelected }
      }

      return updatedTest;
    }, {} as TestItem),
  )

  score$: Observable<Score | null> = combineLatest([
    this.userTest$,
    this.testLength$
  ]).pipe(filter(([ut, length]: [TestItem, number]) => ut.submitted)).pipe(
    tap(([ut, length]: [TestItem, number]) => ut.qId === length && this.isTestCompleteSubject.next(true)),
    scan((acc: TestItem[], [userTest, length]: [TestItem, number]) => {
      return [
        ...acc,
        userTest
      ];
    }, []),
    map((userTests: TestItem[]) => {

      const corrects: number = userTests.filter((t: TestItem) => t.result === true).length;
      const incorrects: number = userTests.filter((t: TestItem) => t.result === false).length;
      const percentage: number = Math.round((corrects / (corrects + incorrects)) * 100);
      return {
        numCorrect: corrects,
        numIncorrect: incorrects,
        percentage
      } as Score  
    }),
    startWith(null),
  )


  makeSelection(option: Option) {
    this.selectedOptionSubject.next(option.optId);
  }

  makeSubmission() {
    this.submittedResultSubject.next(true);
  }

  reset(newTest: number) {
    this.isResettingSubject.next(true);
    this.currentTestItemSubject.next(newTest);
    this.selectedOptionSubject.next(0);
    this.submittedResultSubject.next(false);
  }

  setNextTest(val: number) {
    this.reset(val);
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
