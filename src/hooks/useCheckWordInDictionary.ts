import { useEffect, useState } from "react";
import { checkWordExists } from "./useCheckWordInAdvancedDictionary";

type CheckInDictionaryType = {
    wordToCheck: string,
    submitWord: boolean,
    setSubmitWord: (value: boolean) => void,
};

export const useCheckWordInDictionary = ({ wordToCheck, submitWord, setSubmitWord }: CheckInDictionaryType) => {
    const [isAnalysing, setIsAnalysing] = useState(false);
    const [isValidWord, setIsValidWord] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function checkWord() {
            setIsAnalysing(true);
            setIsError(false);

            try {
                const result = await checkWordExists(wordToCheck.toLowerCase());
                setIsValidWord(result);
            } catch (err) {
                setIsError(true);
                setIsValidWord(false);
            } finally {
                setIsAnalysing(false);
            }
        }

        if (!submitWord) return;
        else if (sessionStorage.getItem("isWordToBeChecked") === 'true') {
            checkWord();
            setSubmitWord(false);
            return;
        }
        setIsValidWord(true);
        setIsError(false);
        setSubmitWord(false);

    }, [submitWord]);

    return { isAnalysing, isValidWord, isError, wordToCheck };
};