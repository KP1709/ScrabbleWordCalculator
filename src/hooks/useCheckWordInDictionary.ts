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

            let apiRes;
            let shouldRunExtendedCheck = false;

            try {
                apiRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`);
                if (apiRes.ok) {
                    setIsValidWord(true);
                } else if (apiRes.status === 404) {
                    shouldRunExtendedCheck = true;
                    setIsValidWord(false);
                }
            } catch (err) {
                setIsError(true);
                setIsValidWord(false);
                shouldRunExtendedCheck = true;
            } finally {
                setIsAnalysing(false);
            }

            const isExtendedCheckEnabled = sessionStorage.getItem("isExtendedCheck") === 'true';

            if (shouldRunExtendedCheck && isExtendedCheckEnabled) {
                setIsAnalysing(true);
                try {
                    const result = await checkWordExists(wordToCheck);
                    setIsValidWord(!!result);
                } catch (err) {
                    setIsError(true);
                    setIsValidWord(false);
                } finally {
                    setIsAnalysing(false);
                }
            } else if (!shouldRunExtendedCheck && !isExtendedCheckEnabled) {
                setIsError(true);
                setIsValidWord(false);
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