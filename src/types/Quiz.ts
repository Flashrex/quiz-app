export interface IAnswer {
    text: string,
    isCorrect?: boolean,
    isSelected?: boolean
}

export interface IQuestion {
    type: string,
    title: string,
    answers: IAnswer[]
}

export interface IQuiz {
    title: string,
    questions: IQuestion[]
}