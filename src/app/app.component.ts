import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
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

  vm$: Observable<VM> = of({
    userTest: {},
    numTestItems: 0,
    submittedResult: false,
    isLast: false,
    score: null,
    isTestComplete: false
  } as VM);

  ngOnInit(): void {
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
