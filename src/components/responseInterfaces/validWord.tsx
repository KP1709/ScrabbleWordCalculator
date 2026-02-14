import { LetterProperties } from "../../reusableTypes/LetterProperties"
import { useEffect, useState } from "react"
import { lookupLettersFromWord } from "../../reusableFunctions/lookupLettersFromWord"
import Tile from "../tile";
import { checkForExceedingTileNumber } from "../../reusableFunctions/checkExceedingTileNumber";
import MaxTileLimitExceeded from "./maxTileLimitExceeded";
import '../../styles/validWord.css'
import { getLetterNoTiles } from "../../reusableFunctions/letterNoTiles";
import { addWordToSearchHistory } from "../../reusableFunctions/searchHistorySave";

type ValidWordType = {
    wordToCheck: string,
    submitWord: boolean
}

export default function ValidWord({ submitWord, wordToCheck }: ValidWordType) {
    const [totalWordScore, setTotalWordScore] = useState(0)
    const [isDoubleWordScoreMultiplier, setIsDoubleWordScoreMultiplier] = useState(false)
    const [isTripleWordScoreMultiplier, setIsTripleWordScoreMultiplier] = useState(false)
    const [resetMultiplier, setResetMultiplier] = useState(false)
    const [isSevenTilesUsed, setIsSevenTilesUsed] = useState(false)
    const [resetIsSevenTilesUsed, setResetIsSevenTilesUsed] = useState(false)
    const [wordToCheckArray, setWordToCheckArray] = useState<LetterProperties[]>([])
    const [isAboveMaxTileAmount, setIsAboveMaxTileAmount] = useState(false)
    const [resetAll, setResetAll] = useState(false)

    useEffect(() => {
        setIsAboveMaxTileAmount(checkForExceedingTileNumber(wordToCheck))
        if (!isAboveMaxTileAmount) {
            setWordToCheckArray(lookupLettersFromWord(wordToCheck))
            sessionStorage.getItem('isStoreSearchHistory') === 'true' && addWordToSearchHistory(wordToCheck)
        }
    }, [])

    useEffect(() => {
        let wordScoreMultiplier = 1;
        if (isDoubleWordScoreMultiplier) wordScoreMultiplier *= 2;
        if (isTripleWordScoreMultiplier) wordScoreMultiplier *= 3;

        const newTotal = wordToCheckArray.reduce((sum, tile) => sum + tile.score, 0)
        setTotalWordScore(newTotal * wordScoreMultiplier + (isSevenTilesUsed ? 50 : 0))
    }, [wordToCheckArray, isDoubleWordScoreMultiplier, isTripleWordScoreMultiplier, isSevenTilesUsed])

    useEffect(() => {
        if (submitWord || resetMultiplier || resetAll) {
            setIsDoubleWordScoreMultiplier(false);
            setIsTripleWordScoreMultiplier(false);
        }
        if (submitWord || resetIsSevenTilesUsed || resetAll) {
            setIsSevenTilesUsed(false)
        }
        if (resetAll) {
            setWordToCheckArray(lookupLettersFromWord(wordToCheck))
        }
        setResetMultiplier(false)
        setResetIsSevenTilesUsed(false)
        setResetAll(false)
    }, [submitWord, resetMultiplier, resetIsSevenTilesUsed, resetAll])

    const handleDoubleToggle = () => {
        setIsDoubleWordScoreMultiplier(!isDoubleWordScoreMultiplier);
    }

    const handleTripleToggle = () => {
        setIsTripleWordScoreMultiplier(!isTripleWordScoreMultiplier);
    }

    /** Handles multiplying letter score on tile */
    const handleTileClick = (id: string) => {
        const hasMaxNumberOfBlanks = wordToCheckArray.filter(tile => tile.action === 'blank').length === getLetterNoTiles("")

        setWordToCheckArray(prevValues => prevValues.map((tile) => {
            if (tile.id === id && !hasMaxNumberOfBlanks) {
                switch (tile.action) {
                    case 'double':
                        return { ...tile, score: tile.originalScore * 3, action: 'triple', colour: 'triple-tile-colour' };
                    case 'triple':
                        return { ...tile, score: 0, action: 'blank', colour: 'blank-tile-colour' };
                    case 'blank':
                        return { ...tile, score: tile.originalScore, action: 'restore', colour: 'restore-tile-colour' };
                    case 'restore':
                        return { ...tile, score: tile.originalScore * 2, action: 'double', colour: 'double-tile-colour' };
                }
            }

            if (tile.id === id && hasMaxNumberOfBlanks) {
                switch (tile.action) {
                    case 'double':
                        return { ...tile, score: tile.originalScore * 3, action: 'triple', colour: 'triple-tile-colour' };
                    case 'triple':
                        return { ...tile, score: tile.originalScore, action: 'restore', colour: 'restore-tile-colour' };
                    case 'restore':
                        return { ...tile, score: tile.originalScore * 2, action: 'double', colour: 'double-tile-colour' };
                }
            }

            if (tile.id === id && hasMaxNumberOfBlanks && tile.action === "blank") {
                return { ...tile, score: tile.originalScore, action: 'restore', colour: 'restore-tile-colour' };
            }
            return tile
        }))
    }

    return (
        !isAboveMaxTileAmount ? <div className="flex-centre-column" data-test="valid-word-screen">
            <ul className="flex-centre-row tile-list">
                {wordToCheckArray.map(char =>
                    <li key={char.id} className="flex-centre" data-test='word-tile'>
                        <Tile
                            id={char.id}
                            letter={char.letter}
                            score={char.score}
                            onClick={() => { handleTileClick(char.id); }}
                            action={char.action}
                            colour={char.colour}
                            originalScore={char.originalScore} />
                    </li>
                )}
            </ul>

            <h3 id="score" data-test="total-word-score"> Total : {totalWordScore}</h3>

            <div id="multiplier__buttons" className="flex-centre-row">
                <button className='multiplier__button'
                    data-test='double-total-score-btn'
                    onClick={handleDoubleToggle}>
                    {isDoubleWordScoreMultiplier ? 'Double selected' : 'Double total score'}
                </button>

                <button className='multiplier__button'
                    data-test='triple-total-score-btn'
                    onClick={handleTripleToggle}>
                    {isTripleWordScoreMultiplier ? 'Triple selected' : 'Triple total score'}
                </button>
            </div>
            <div id="multiplier__buttons" className="flex-centre-row">
                {wordToCheckArray.length >= 7 && <button className="multiplier__button" data-test='bonus-btn'
                    onClick={() => { setIsSevenTilesUsed(!isSevenTilesUsed) }}>
                    {!isSevenTilesUsed ? 'Add' : 'Remove'} seven tile bonus
                </button>}

                <button className="multiplier__button" data-test='reset-btn'
                    onClick={() => { setResetAll(!resetAll) }}>
                    Reset all
                </button>
            </div>
        </div> : <MaxTileLimitExceeded />
    )

}