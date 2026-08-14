import { checkForExceedingTileNumber } from "../reusableFunctions/checkExceedingTileNumber";
import { checkWordExists } from "./useCheckWordInAdvancedDictionary";

export type Outcome =
    | 'start'
    | 'analysing'
    | 'valid'
    | 'invalid'
    | 'invalid-tooLong'
    | 'invalid-cannotMake'
    | 'unknown'
    | 'error';

const MAX_TILE_AMOUNT = 15;

export async function checkOutcome(wordToCheck: string): Promise<Outcome> {
    if (!wordToCheck || wordToCheck.length === 0) return 'start';
    if (sessionStorage.getItem("isWordToBeChecked") === 'false') return 'valid';
    if (wordToCheck.length > MAX_TILE_AMOUNT) return 'invalid-tooLong';
    if (!(/^[A-Z]+$/i).test(wordToCheck)) return 'invalid';

    try {
        const isValidWord = await checkWordExists(wordToCheck.toLowerCase());
        if (!isValidWord) return 'unknown';

        const isWordProducible = !checkForExceedingTileNumber(wordToCheck.toLowerCase());
        return isWordProducible ? 'valid' : 'invalid-cannotMake';
    } catch (err) {
        console.error('Dictionary check failed', err);
        return 'error';
    }
}

export default checkOutcome;