import { getLetterNoTiles } from "./letterNoTiles";

export const useCheckForExceedingTileNumber = (wordToCheck: string) => {
    let isExceedingTiles = false;

    const countTiles = (s: string) => {
        const obj: Record<string, number> = {};
        for (const char of s) {
            obj[char] = (obj[char] || 0) + 1;
        }

        const result = Object.entries(obj).map(
            ([char, count]) => ({ letter: char, count: count })
        );
        return result;
    };

    countTiles(wordToCheck).map(item => {
        if (getLetterNoTiles(item.letter) + 2 < item.count) {
            isExceedingTiles = true;
            return
        }
    })

    return isExceedingTiles;
}
