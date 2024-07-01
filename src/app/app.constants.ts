import { TestItem } from "./app.models";

export const Test: TestItem[] = [
    {
        qId: 1,
        question: 'Select all operators that require source Observable completion',
        options: [
            {
                optId: 1,
                description: 'forkJoin',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 2,
                description: 'reduce',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 3,
                description: 'toArray',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 4,
                description: 'last',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 5,
                description: 'groupBy',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 6,
                description: 'combineLatest',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 7,
                description: 'filter',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 8,
                description: 'withLatestFrom',
                isCorrect: false,
                isSelected: false,
            }],
        result: undefined,
        selectionsMade: false,
        submitted: false
    },
    {
        qId: 2,
        question: 'Select all operators that return a mirror of the source Observable',
        options: [
            {
                optId: 1,
                description: 'tap',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 2,
                description: 'finalize',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 3,
                description: 'delay',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 4,
                description: 'throttle',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 5,
                description: 'throttleTime',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 6,
                description: 'debounce',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 7,
                description: 'debounceTime',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 8,
                description: 'of',
                isCorrect: false,
                isSelected: false,
            }],
        result: undefined,
        selectionsMade: false,
        submitted: false
    },
    {
        qId: 3,
        question: 'Select all of the RxJS subjects',
        options: [
            {
                optId: 1,
                description: 'Subject',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 2,
                description: 'ReplaySubject',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 3,
                description: 'AsyncSubject',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 4,
                description: 'BehaviorSubject',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 5,
                description: 'ConcatSubject',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 6,
                description: 'TapSubject',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 7,
                description: 'RegularSubject',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 8,
                description: 'JoinSubject',
                isCorrect: false,
                isSelected: false,
            }],
        result: undefined,
        selectionsMade: false,
        submitted: false
    },
    {
        qId: 4,
        question: 'Select all operators that can create an infinite or non-completing Observable',
        options: [
            {
                optId: 1,
                description: 'interval',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 2,
                description: 'Subject',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 3,
                description: 'timer',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 4,
                description: 'forkJoin',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 5,
                description: 'throttleTime',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 6,
                description: 'debounce',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 7,
                description: 'debounceTime',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 8,
                description: 'throttle',
                isCorrect: false,
                isSelected: false,
            }],
        result: undefined,
        selectionsMade: false,
        submitted: false
    },
    {
        qId: 5,
        question: 'Select all operators that can create a Higher-Order Observable',
        options: [
            {
                optId: 1,
                description: 'groupBy',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 2,
                description: 'map',
                isCorrect: true,
                isSelected: false,
            },
            {
                optId: 3,
                description: 'createHigherOrder',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 4,
                description: 'retry',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 5,
                description: 'retryWhen',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 6,
                description: 'concatMap',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 7,
                description: 'mergeMap',
                isCorrect: false,
                isSelected: false,
            },
            {
                optId: 8,
                description: 'switchMap',
                isCorrect: false,
                isSelected: false,
            }],
        result: undefined,
        selectionsMade: false,
        submitted: false
    },
];