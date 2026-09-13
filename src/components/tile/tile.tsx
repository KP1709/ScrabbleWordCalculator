import { LetterProperties } from "../../reusableTypes/LetterProperties";
import styles from "./tile.module.css";

type TileProp = LetterProperties & { onClick: () => void; };

const actionLabels: Record<LetterProperties["action"], string> = {
    double: "double word score",
    triple: "triple word score",
    blank: "blank tile",
    restore: "regular score",
};

const tileColourStyles: Record<LetterProperties["colour"], string> = {
    "triple-tile-colour": styles.tripleTileColour,
    "double-tile-colour": styles.doubleTileColour,
    "blank-tile-colour": styles.blankTileColour,
    "restore-tile-colour": styles.restoreTileColour,
};

const Tile = ({ letter, score, onClick, colour, action }: TileProp) => (
    <div data-test={`list-tile-${letter}`}>
        <button
            type="button"
            aria-label={`${letter} tile, ${actionLabels[action]}, ${score} points. Activate to cycle tile value.`}
            className={`flex-centre-column ${styles.tileLetter} ${tileColourStyles[colour]}`}
            onClick={onClick}>
            {letter}
        </button>
        <span className={`flex-centre-column ${styles.tileScore}`}>{score}</span>
    </div>
);

export default Tile;