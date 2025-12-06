const HISTORY_NO = 10

export const addWordToSearchHistory = (wordToAdd: string) => {
    let currentWordList: string[] = JSON.parse(sessionStorage.getItem("searchHistory") || "[]");
    currentWordList = currentWordList.filter(word => word !== wordToAdd);

    const updatedWordList = [wordToAdd, ...currentWordList];
    const trimmedList = updatedWordList.slice(0, HISTORY_NO);
    sessionStorage.setItem("searchHistory", JSON.stringify(trimmedList));
};