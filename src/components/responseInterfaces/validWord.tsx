import { LetterProperties } from "../../reusableTypes/LetterProperties"
import { useEffect, useState } from "react"
import { useLookupLettersFromWord } from "../../reusableFunctions/useLookupLettersFromWord"
import { v4 as uuid } from "uuid"
import Tile from "../tile";
import { useCheckForExceedingTileNumber } from "../../reusableFunctions/useCheckExceedingTileNumber";
import MaxTileLimitExceeded from "./maxTileLimitExceeded";
import '../../styles/validWord.css'
import { getLetterNoTiles } from "../../reusableFunctions/letterNoTiles";
import useBreakpoint from "../../hooks/useBreakpoint";
import HowToModal from "../howToModal";
import SettingsModal from "../settingsModal";

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

    const breakpoint = useBreakpoint()
    const [isHowToModalOpen, setIsHowToModalOpen] = useState(false)
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false)

    useEffect(() => {
        setIsAboveMaxTileAmount(useCheckForExceedingTileNumber(wordToCheck))
        if (!isAboveMaxTileAmount) {
            setWordToCheckArray(useLookupLettersFromWord(wordToCheck))
        }
    }, [submitWord])

    useEffect(() => {
        let wordScoreMultiplier = 1;
        if (isDoubleWordScoreMultiplier) wordScoreMultiplier *= 2;
        if (isTripleWordScoreMultiplier) wordScoreMultiplier *= 3;

        const newTotal = wordToCheckArray.reduce((sum, tile) => sum + tile.score, 0)
        setTotalWordScore(newTotal * wordScoreMultiplier + (isSevenTilesUsed ? 50 : 0))
    }, [wordToCheckArray, isDoubleWordScoreMultiplier, isTripleWordScoreMultiplier, isSevenTilesUsed])

    useEffect(() => {
        if (submitWord || resetMultiplier) {
            setIsDoubleWordScoreMultiplier(false);
            setIsTripleWordScoreMultiplier(false);
        }
        if (submitWord || resetIsSevenTilesUsed) {
            setIsSevenTilesUsed(false)
        }
        setResetMultiplier(false)
        setResetIsSevenTilesUsed(false)
    }, [submitWord, resetMultiplier, resetIsSevenTilesUsed])

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
                return { ...tile, score: tile.originalScore, action: 'restore', colour: tile.colour };
            }
            return tile
        }))
    }

    return (
        !isAboveMaxTileAmount ? <div className="flex-centre-column" data-test="valid-word-screen">
            <ul className="flex-centre-row">
                {wordToCheckArray.map(char =>
                    <li key={uuid()} className="flex-centre" data-test='word-tile'>
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

            {wordToCheckArray.length >= 7 && <button className="multiplier__button" data-test='bonus-btn'
                onClick={() => { setIsSevenTilesUsed(!isSevenTilesUsed) }}>
                {!isSevenTilesUsed ? 'Add' : 'Remove'} seven tile bonus
            </button>}

            <span>
                {breakpoint < 400 && <button id='instructions-btn' onClick={() => setIsHowToModalOpen(true)} title='View instructions'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z">
                        </path>
                    </svg>
                </button>}
                {breakpoint < 400 && <button id='settings-btn' onClick={() => setIsSettingsModalOpen(true)} title='Open settings'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
                    </svg>
                </button>}
                <HowToModal open={isHowToModalOpen} onClose={() => setIsHowToModalOpen(false)} />
                <SettingsModal open={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)} />
            </span>

        </div> : <MaxTileLimitExceeded />
    )

}