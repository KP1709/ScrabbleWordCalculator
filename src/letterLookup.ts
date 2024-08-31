// Contains score and number of available tiles of that letter

// Type alias for letters array
type letterProperties = {
    score: number,
    maxAmount: number
}

export const letters= new Map<string, letterProperties>([
    ["A", {"score":1, "maxAmount":9}],
    ["B", {"score":3, "maxAmount":2}],
    ["C", {"score":3, "maxAmount":2}],
    ["D", {"score":2, "maxAmount":4}],
    ["E", {"score":1, "maxAmount":12}],
    ["F", {"score":4, "maxAmount":2}],
    ["G", {"score":2, "maxAmount":3}],
    ["H", {"score":4, "maxAmount":2}],
    ["I", {"score":1, "maxAmount":9}],
    ["J", {"score":8, "maxAmount":1}],
    ["K", {"score":5, "maxAmount":1}],
    ["L", {"score":1, "maxAmount":4}],
    ["M", {"score":3, "maxAmount":2}],
    ["N", {"score":1, "maxAmount":6}],
    ["O", {"score":1, "maxAmount":8}],
    ["P", {"score":3, "maxAmount":2}],
    ["Q", {"score":10, "maxAmount":1}],
    ["R", {"score":1, "maxAmount":6}],
    ["S", {"score":1, "maxAmount":4}],
    ["T", {"score":1, "maxAmount":6}],
    ["U", {"score":1, "maxAmount":4}],
    ["V", {"score":4, "maxAmount":2}],
    ["W", {"score":4, "maxAmount":2}],
    ["X", {"score":8, "maxAmount":1}],
    ["Y", {"score":4, "maxAmount":2}],
    ["Z", {"score":10, "maxAmount":1}],
    // ["",{"score":0, "maxAmount":2}]
])