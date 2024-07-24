import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { combineLatest, map, Observable, of } from 'rxjs';
import { Option, Score, TestItem } from './app.models';
import { CommonModule } from '@angular/common';
import { AppService } from './app.service';

export interface VM {
  userTest: TestItem;
  numTestItems: number;
  submittedResult: boolean;
  isLast: boolean;
  score: Score | null;
  isTestComplete: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  private appService: AppService = inject(AppService);

  vm$: Observable<VM> = combineLatest([
    this.appService.userTest$,
    this.appService.testLength$,
    this.appService.submittedResult$,
    this.appService.isLast$,
    this.appService.score$,
    this.appService.isTestComplete$
  ]).pipe(
    map(([userTest, numTestItems, submittedResult, isLast, score, isTestComplete]: [TestItem, number, boolean, boolean, Score | null, boolean]) => {
      return {
        userTest,
        numTestItems,
        submittedResult,
        isLast,
        score,
        isTestComplete
      }
    })
  );

  ngOnInit(): void {
    this.vm$.subscribe({
      next: vm => console.log('vm$', JSON.stringify(vm, null, "\t"))
    })
  }

  selectCard(selection: Option, wasSubmitted: boolean) {
    if (!wasSubmitted) {
      this.appService.makeSelection(selection);
    }
  }

  nextTest(next: number) {
    this.appService.setNextTest(next);
  }

  submit() {
    this.appService.makeSubmission();
  }
}
