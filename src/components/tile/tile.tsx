import { LetterProperties } from "../../reusableTypes/LetterProperties";
import styles from "./tile.module.css";

type TileProp = LetterProperties & { onClick: () => void; };

const tileColourStyles: Record<LetterProperties["colour"], string> = {
    "triple-tile-colour": styles.tripleTileColour,
    "double-tile-colour": styles.doubleTileColour,
    "blank-tile-colour": styles.blankTileColour,
    "restore-tile-colour": styles.restoreTileColour,
};

const Tile = ({ letter, score, onClick, colour }: TileProp) => (
    <div data-test={`list-tile-${letter}`}>
        <span
            className={`flex-centre-column ${styles.tileLetter} ${tileColourStyles[colour]}`}
            tabIndex={0} onClick={onClick}
            onKeyDown={(e) => { if (e.key === ' ') onClick(); }}>
            {letter}
        </span>
        <span className={`flex-centre-column ${styles.tileScore}`}>{score}</span>
    </div>
);

export default Tile;