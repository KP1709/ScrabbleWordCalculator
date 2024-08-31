// Contains score and number of available tiles of that letter

// Type alias for letters array
type letterProperties = {
    letter: string,
    score: number,
    maxAmount: number
}

export const letters:letterProperties[] = [
    {"letter":"A", "score":1, "maxAmount":9},
    {"letter":"B", "score":3, "maxAmount":2},
    {"letter":"C", "score":3, "maxAmount":2},
    {"letter":"D", "score":2, "maxAmount":4},
    {"letter":"E", "score":1, "maxAmount":12},
    {"letter":"F", "score":4, "maxAmount":2},
    {"letter":"G", "score":2, "maxAmount":3},
    {"letter":"H", "score":4, "maxAmount":2},
    {"letter":"I", "score":1, "maxAmount":9},
    {"letter":"J", "score":8, "maxAmount":1},
    {"letter":"K", "score":5, "maxAmount":1},
    {"letter":"L", "score":1, "maxAmount":4},
    {"letter":"M", "score":3, "maxAmount":2},
    {"letter":"N", "score":1, "maxAmount":6},
    {"letter":"O", "score":1, "maxAmount":8},
    {"letter":"P", "score":3, "maxAmount":2},
    {"letter":"Q", "score":10, "maxAmount":1},
    {"letter":"R", "score":1, "maxAmount":6},
    {"letter":"S", "score":1, "maxAmount":4},
    {"letter":"T", "score":1, "maxAmount":6},
    {"letter":"U", "score":1, "maxAmount":4},
    {"letter":"V", "score":4, "maxAmount":2},
    {"letter":"W", "score":4, "maxAmount":2},
    {"letter":"X", "score":8, "maxAmount":1},
    {"letter":"Y", "score":4, "maxAmount":2},
    {"letter":"Z", "score":10, "maxAmount":1},
    // {"letter":"", "score":0, "maxAmount":2}
]