import IsAnalysing from "./responseInterfaces/isAnalysing"
import InvalidEntry from "./responseInterfaces/invalidEntry"
import UnknownWord from "./responseInterfaces/unknownWord"
import StartScreen from "./responseInterfaces/startScreen"
import ValidWord from "./responseInterfaces/validWord"
import { useScrabbleContext } from "../pages/letterCalculator"

type ResponseInterface = {
    isValidString: string,
    isValidWord: boolean
    isAnalysing: boolean,
}

export default function ResponseInterfaces(
    { isValidString,
        isAnalysing,
        isValidWord}
        : ResponseInterface) {

        const {wordToCheckArray} = useScrabbleContext()


    if (isValidString === "start") return (<StartScreen />)
    else if (isAnalysing) return (<IsAnalysing />)
    else if (isValidString === "false") return (<InvalidEntry />)
    else if (isValidString === "true" && isValidWord === false) return (<UnknownWord />)

    return (
        <ValidWord wordToCheckArray={wordToCheckArray}/>
    )
}