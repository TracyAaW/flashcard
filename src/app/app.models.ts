
export interface Option {
    optId: number;
    description: string;
    isCorrect: boolean;
    isSelected: boolean;
}

export interface TestItem {
    qId: number,
    question: string;
    options: Option[];
    result?: boolean;
    selectionsMade: boolean;
    submitted: boolean;
}

export interface Score {
    numCorrect: number;
    numIncorrect: number;
    percentage: number;
}