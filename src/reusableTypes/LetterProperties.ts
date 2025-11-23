export type LetterProperties = {
    id: string,
    letter: string,
    score: number,
    originalScore: number,
    action: 'double' | 'triple' | 'restore' | 'blank',
    colour: string
}