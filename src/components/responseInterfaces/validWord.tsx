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

type ScoreModifierButtonsType = {
    dataTest: string;
    onClick: () => void;
    buttonText: string;
};

const ScoreModifierButtons = ({ dataTest, onClick, buttonText }: ScoreModifierButtonsType) => {
    return (
        <button
            className='multiplier__button'
            data-test={dataTest}
            onClick={onClick}>
            {buttonText}
        </button>
    );
};

export default function ValidWord({ submitWord, wordToCheck }: ValidWordType) {
    const { isStoreSearchHistory } = useSettings();
    const [totalWordScore, setTotalWordScore] = useState(0);
    const [wordToCheckArray, setWordToCheckArray] = useState<LetterProperties[]>([]);
    const [isAboveMaxTileAmount, setIsAboveMaxTileAmount] = useState(false);
    const [scoreModifiers, setScoreModifiers] = useState({
        double: false,
        triple: false,
        sevenTileBonus: false,
    });

    const handleDoubleToggle = () => {
        setScoreModifiers(prev => {
            return { ...prev, double: !prev.double };
        });
    };

    const handleTripleToggle = () => {
        setScoreModifiers(prev => {
            return { ...prev, triple: !prev.triple };
        });
    };

    const handleSevenTileBonus = () => {
        setScoreModifiers(prev => {
            return { ...prev, sevenTileBonus: !prev.sevenTileBonus };
        });
    };

    const handleReset = () => {
        setScoreModifiers(prev => {
            return { ...prev, double: false, triple: false, sevenTileBonus: false };
        });
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
        if (scoreModifiers.double) wordScoreMultiplier *= 2;
        if (scoreModifiers.triple) wordScoreMultiplier *= 3;

        const newTotal = wordToCheckArray.reduce((sum, tile) => sum + tile.score, 0);
        setTotalWordScore(newTotal * wordScoreMultiplier + (scoreModifiers.sevenTileBonus ? 50 : 0));
    }, [wordToCheckArray, scoreModifiers]);

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
                <ScoreModifierButtons
                    dataTest='double-total-score-btn'
                    onClick={handleDoubleToggle}
                    buttonText={scoreModifiers.double ? 'Double selected' : 'Double total score'}
                />
                <ScoreModifierButtons dataTest='triple-total-score-btn'
                    onClick={handleTripleToggle}
                    buttonText={scoreModifiers.triple ? 'Triple selected' : 'Triple total score'}
                />
            </div>
            <div id="multiplier__buttons" className="flex-centre-row">
                {wordToCheckArray.length >= 7 &&
                    <ScoreModifierButtons dataTest='bonus-btn'
                        onClick={handleSevenTileBonus}
                        buttonText={scoreModifiers.sevenTileBonus ? 'Remove seven tile bonus' : 'Add seven tile bonus'}
                    />
                }
                <ScoreModifierButtons dataTest='reset-btn'
                    onClick={handleReset}
                    buttonText='Reset all'
                />
            </div>
        </div>
    );

}