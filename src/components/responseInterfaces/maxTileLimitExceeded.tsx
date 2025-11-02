const MaxTileLimitExceeded = () => {
    return (
        <div className="flex-centre" data-test="max-tile-limit-exceeded-screen">
            <h2>Tile Limit Exceeded</h2>
            <p>The word you have entered contains letters which exceeds the maximum number of tiles available to use</p>
            <svg aria-hidden='true' focusable='false' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path></svg>
        </div>
    )
}

export default MaxTileLimitExceeded