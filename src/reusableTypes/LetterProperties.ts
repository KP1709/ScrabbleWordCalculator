type LetterActionType = 'double' | 'triple' | 'restore' | 'blank';

export type LetterProperties = {
    id: string,
    letter: string,
    score: number,
    originalScore: number,
    action: LetterActionType,
    colour: string;
};