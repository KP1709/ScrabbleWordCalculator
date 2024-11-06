import "../styles/tile.css"

type TileProp = {
    id: string,
    letter: string,
    score: number,
    onClick: () => void,
    action: 'double' | 'triple' | 'restore',
    colour: '#90e0ef' | '#0077b6' | '#ffffff'
}

export default function Tile({ letter, score, onClick, colour }: TileProp) {
    return (
        <div onClick={onClick} data-test={`list-tile-${letter}`}
        >
            <h2 style={{ backgroundColor: `${colour}` }}>{letter}</h2>
            <h3>{score}</h3>
        </div>
    )
}