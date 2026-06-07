import { useState } from "react";
import "../styles/letterCalculator.css";
import { useCheckWordInDictionary } from "../hooks/useCheckWordInDictionary";
import StartScreen from "../components/responseInterfaces/startScreen";
import IsAnalysing from "../components/responseInterfaces/isAnalysing";
import UnknownWord from "../components/responseInterfaces/unknownWord";
import ValidWord from "../components/responseInterfaces/validWord";
import Error from "../components/responseInterfaces/isError";
import InvalidEntry from "../components/responseInterfaces/invalidEntry";
import HowToModal from "../components/modals/howToModal";
import SettingsModal from "../components/modals/settingsModal";
import MobileBar from "../components/mobileBar";
import HistoryModal from "../components/modals/historyModal";
import { useSettings } from "../hooks/useSettings";

type ValidString = "true" | "false" | "start";

const MAX_TILE_AMOUNT = 15;

export default function LetterCalculator() {
    const [wordToCheck, setWordToCheck] = useState("");
    const [isValidString, setIsValidString] = useState<ValidString>("start");
    const [submitWord, setSubmitWord] = useState(false);
    const [isTooLong, setIsTooLong] = useState(false);
    const [modalVisibility, setModalVisibility] = useState({ howTo: false, settings: false, history: false });

    const { isError, isAnalysing, isValidWord } = useCheckWordInDictionary({ wordToCheck, submitWord, setSubmitWord });
    const { isStoreSearchHistory, setIsStoreSearchHistory } = useSettings();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!(wordToCheck.length <= MAX_TILE_AMOUNT)) {
            setIsValidString("true");
            setIsTooLong(true);
            return;
        }
        if ((/^[A-Z]+$/i).test(wordToCheck)) {
            setIsValidString("true");
            setIsTooLong(false);
            setSubmitWord(true);
            return;
        }
        setIsValidString("false");
        setIsTooLong(false);
    };

    return (
        <main>
            <span className="flex-centre-row">
                <form onSubmit={handleSubmit} className="flex-centre-row">
                    <label htmlFor="word">Word:</label>
                    <input type="text"
                        className="form__input-text"
                        name="word"
                        id="word"
                        data-test='word-form'
                        value={wordToCheck}
                        onChange={(e) => setWordToCheck(e.target.value)}
                        placeholder="scrabble"
                    />
                    <input
                        type="submit"
                        value="Check"
                        data-test='submit-word-form-btn'
                        className="form__input-button"
                        title='Submit word for check'
                    />
                </form>

            </span>
            <HowToModal
                isOpen={modalVisibility.howTo}
                onClose={() => setModalVisibility((modal) => ({ ...modal, howTo: false }))}
            />
            <SettingsModal
                isOpen={modalVisibility.settings}
                onClose={() => setModalVisibility((modal) => ({ ...modal, settings: false }))}
                isStoreSearchHistory={isStoreSearchHistory}
                setIsStoreSearchHistory={setIsStoreSearchHistory}
            />
            <HistoryModal
                isOpen={modalVisibility.history}
                onClose={() => setModalVisibility((modal) => ({ ...modal, history: false }))}
                setWordToCheck={setWordToCheck}
            />

            {isValidString === "start" && <StartScreen />}
            {isAnalysing && <IsAnalysing />}
            {(isValidString === "false" || isTooLong) && <InvalidEntry isTooLong={isTooLong} />}
            {isValidString === "true" && !isValidWord && !isError && !isTooLong && !isAnalysing && <UnknownWord />}
            {isValidString === "true" && !isValidWord && isError && !isAnalysing && <Error wordToCheck={wordToCheck} />}

            {isValidString === "true" && isValidWord && !isError && !isAnalysing && !isTooLong &&
                <ValidWord wordToCheck={wordToCheck.toLowerCase()} submitWord={submitWord} />
            }
            <MobileBar
                setModalVisibility={setModalVisibility}
                isStoreSearchHistory={isStoreSearchHistory}
            />
        </main>
    );
}
