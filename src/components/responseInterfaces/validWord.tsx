import { LetterProperties } from "../../reusableTypes/LetterProperties";
import { useEffect, useState } from "react";
import { lookupLettersFromWord } from "../../reusableFunctions/lookupLettersFromWord";
import Tile from "../tile";
import { checkForExceedingTileNumber } from "../../reusableFunctions/checkExceedingTileNumber";
import MaxTileLimitExceeded from "./maxTileLimitExceeded";
import '../../styles/validWord.css';
import { getLetterNoTiles } from "../../reusableFunctions/letterNoTiles";
import { addWordToSearchHistory } from "../../reusableFunctions/searchHistorySave";
import { useSettings } from "../../hooks/useSettings";

type ValidWordType = {
    wordToCheck: string,
    submitWord: boolean;
};

export default function ValidWord({ submitWord, wordToCheck }: ValidWordType) {
    const { isStoreSearchHistory } = useSettings();
    const [totalWordScore, setTotalWordScore] = useState(0);
    const [isDoubleWordScoreMultiplier, setIsDoubleWordScoreMultiplier] = useState(false);
    const [isTripleWordScoreMultiplier, setIsTripleWordScoreMultiplier] = useState(false);
    const [isSevenTilesUsed, setIsSevenTilesUsed] = useState(false);
    const [wordToCheckArray, setWordToCheckArray] = useState<LetterProperties[]>([]);
    const [isAboveMaxTileAmount, setIsAboveMaxTileAmount] = useState(false);

    const handleDoubleToggle = () => {
        setIsDoubleWordScoreMultiplier(!isDoubleWordScoreMultiplier);
    };

    const handleTripleToggle = () => {
        setIsTripleWordScoreMultiplier(!isTripleWordScoreMultiplier);
    };

    const handleSevenTileBonus = () => {
        setIsSevenTilesUsed(!isSevenTilesUsed);
    };

    const handleReset = () => {
        setIsDoubleWordScoreMultiplier(false);
        setIsTripleWordScoreMultiplier(false);
        setIsSevenTilesUsed(false);
        setWordToCheckArray(lookupLettersFromWord(wordToCheck));
    };

    useEffect(() => {
        handleReset();
        setIsAboveMaxTileAmount(checkForExceedingTileNumber(wordToCheck));
        if (!isAboveMaxTileAmount) {
            setWordToCheckArray(lookupLettersFromWord(wordToCheck));
            isStoreSearchHistory && addWordToSearchHistory(wordToCheck);
        }
    }, [submitWord]);

    useEffect(() => {
        let wordScoreMultiplier = 1;
        if (isDoubleWordScoreMultiplier) wordScoreMultiplier *= 2;
        if (isTripleWordScoreMultiplier) wordScoreMultiplier *= 3;

        const newTotal = wordToCheckArray.reduce((sum, tile) => sum + tile.score, 0);
        setTotalWordScore(newTotal * wordScoreMultiplier + (isSevenTilesUsed ? 50 : 0));
    }, [wordToCheckArray, isDoubleWordScoreMultiplier, isTripleWordScoreMultiplier, isSevenTilesUsed]);


    /** Handles multiplying letter score on tile */
    const handleTileClick = (id: string) => {
        const hasMaxNumberOfBlanks = wordToCheckArray.filter(tile => tile.action === 'blank').length === getLetterNoTiles("");

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
            return tile;
        }));
    };

    if (isAboveMaxTileAmount) return <MaxTileLimitExceeded />;

    return (
        <div className="flex-centre-column" data-test="valid-word-screen">
            <ul className="flex-centre-row tile-list">
                {wordToCheckArray.map(char =>
                    <li key={char.id} className="flex-centre" data-test='word-tile'>
                        <Tile
                            {...char}
                            onClick={() => { handleTileClick(char.id); }}
                        />
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
                    onClick={handleSevenTileBonus}>
                    {!isSevenTilesUsed ? 'Add' : 'Remove'} seven tile bonus
                </button>}

                <button className="multiplier__button" data-test='reset-btn'
                    onClick={handleReset}>
                    Reset all
                </button>
            </div>
        </div>
    );

}