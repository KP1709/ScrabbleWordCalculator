export default function ScoreModifier({ ...props }) {
    const {handleMultiply, totalWordScoreMultiplier, handleReset } = { ...props }
    return (
        <>
            <div id="multiplier__buttons" className="flex-centre">
                {totalWordScoreMultiplier === 1 &&
                    <button className="multiplier__button"
                        onClick={() => handleMultiply(2)}>
                        Double total score
                    </button>}

                {totalWordScoreMultiplier === 1 &&
                    <button className="multiplier__button"
                        onClick={() => handleMultiply(3)}>
                        Triple total score
                    </button>}

                {totalWordScoreMultiplier !== 1 &&
                    <button className="multiplier__button"
                        onClick={handleReset}>
                        Reset score multiplier
                    </button>}
            </div>
        </>
    )
}