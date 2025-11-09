export type LetterProperties = {
    id: string,
    letter: string,
    score: number,
    originalScore: number,
    action: 'double' | 'triple' | 'restore' | 'blank',
    colour: '#90e0ef' | '#0077b6' | '#fcf1e1'
}