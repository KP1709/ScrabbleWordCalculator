import { LetterProperties } from "../reusableTypes/LetterProperties";
import "../styles/tile.css";

type TileProp = LetterProperties & { onClick: () => void; };

const Tile = ({ letter, score, onClick, colour }: TileProp) => {
    return (
        <div data-test={`list-tile-${letter}`}
        >
            <h2
                className={`flex-centre-column ${colour}`}
                tabIndex={0} onClick={onClick}
                onKeyDown={(e) => { if (e.key === ' ') onClick(); }}>
                {letter}
            </h2>
            <h3 className="flex-centre-column">{score}</h3>
        </div>
    );
};

export default Tile;