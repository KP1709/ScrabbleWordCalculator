import "../styles/tile.css"

type TileProp = {
    id: string,
    letter: string,
    score: number,
    onClick: () => void
    action: 'double' | 'triple' | 'restore';
}

export default function Tile({letter, score, onClick} : TileProp){
    return(
        <div onClick={onClick}>
            <h2>{letter}</h2>
            <h3>{score}</h3>
        </div>
    )
}