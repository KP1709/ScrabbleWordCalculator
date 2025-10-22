import { useEffect, useState } from "react"

type CheckInDictionaryType = {
    wordToCheck: string,
    setIsValidString: (value: "true" | "false" | "start") => void
    submitWord: boolean,
    setSubmitWord: (value: boolean) => void,
}

export const useCheckWordInDictionary = ({ wordToCheck, setIsValidString, submitWord, setSubmitWord }: CheckInDictionaryType) => {
    const [isSupabaseError, setIsSupabaseError] = useState<boolean>(false);
    const [isApiError, setIsApiError] = useState<boolean>(false);
    const [isAnalysing, setIsAnalysing] = useState(false)
    const [isValidWord, setIsValidWord] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        async function checkWord() {
            try {
                setIsAnalysing(true)
                setIsValidString('true')
                setIsError(false)

                const apiRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordToCheck}`)
                const data = await apiRes.json()
                if (apiRes.ok) {
                    setIsValidWord(true)
                }
                else if (!Array.isArray(data)) {
                    try {
                        const res = await fetch(`/.netlify/functions/supabase?word=${wordToCheck}`, {
                            method: "POST",
                            body: JSON.stringify({ word: wordToCheck }),
                        })

                        if (res.status === 404) {
                            setIsValidWord(false)
                            return
                        }
                        const data = await res.json()
                        data.data[0] ? setIsValidWord(true) : setIsValidWord(false)

                    } catch (err) {
                        setIsError(true); setIsSupabaseError(true); setIsApiError(true); setIsValidWord(false)
                    }
                }
            }
            catch (err) {
                setIsError(true); setIsApiError(true); setIsValidWord(false)
            }
        }
        setIsAnalysing(false)

        if (submitWord) {
            checkWord()
        }
        setSubmitWord(false)
    }, [submitWord])

    return { isAnalysing, isApiError, isSupabaseError, isValidWord, isError, wordToCheck }
}