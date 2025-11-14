import { useEffect, useState } from "react"

type CheckInDictionaryType = {
    wordToCheck: string,
    submitWord: boolean,
    setSubmitWord: (value: boolean) => void,
}

export const useCheckWordInDictionary = ({ wordToCheck, submitWord, setSubmitWord }: CheckInDictionaryType) => {
    const [isAnalysing, setIsAnalysing] = useState(false)
    const [isValidWord, setIsValidWord] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        async function checkWord() {
            setIsAnalysing(true);
            setIsError(false);

            let apiRes;
            let shouldRunSupabase = false;

            try {
                apiRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`);
                if (apiRes.ok) {
                    setIsValidWord(true);
                } else if (apiRes.status === 404) {
                    shouldRunSupabase = true;
                }
                else if (!apiRes.ok && apiRes.status !== 404) {
                    // Must manually check and specify this 
                    setIsError(true);
                    setIsValidWord(false);
                }
            } catch (err) {
                setIsError(true);
                setIsValidWord(false);
            } finally {
                setIsAnalysing(false);
            }

            if (shouldRunSupabase) {
                try {
                    setIsAnalysing(true);
                    const res = await fetch(`/.netlify/functions/supabase?word=${wordToCheck}`, {
                        method: "POST",
                        body: JSON.stringify({ word: wordToCheck }),
                    });
                    if (res.status === 404) {
                        setIsValidWord(false);
                        return;
                    }
                    const data = await res.json();
                    data.data[0] ? setIsValidWord(true) : setIsValidWord(false);
                } catch (err) {
                    setIsError(true);
                    setIsValidWord(false);
                } finally {
                    setIsAnalysing(false);
                }
            }
        }

        if (submitWord) {
            checkWord()
            setSubmitWord(false)
        }
    }, [submitWord])

    return { isAnalysing, isValidWord, isError, wordToCheck }
}