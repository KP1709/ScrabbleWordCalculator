import { useState } from "react";
import "../styles/letterCalculator.css";
import checkOutcome, { Outcome } from "../hooks/useCheckOutcome";
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
import MaxTileLimitExceeded from "../components/responseInterfaces/maxTileLimitExceeded";
import { useSettings } from "../hooks/useSettings";

export default function LetterCalculator() {
    const [wordToCheck, setWordToCheck] = useState("");
    const [outcome, setOutcome] = useState<Outcome>('start');
    const [modalVisibility, setModalVisibility] = useState({ howTo: false, settings: false, history: false });

    const { isStoreSearchHistory, setIsStoreSearchHistory } = useSettings();

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setOutcome('analysing');

        (async () => {
            const result = await checkOutcome(wordToCheck);
            setOutcome(result);
        })();
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

            {outcome === 'start' && <StartScreen />}
            {outcome === 'analysing' && <IsAnalysing />}
            {(outcome === 'invalid' || outcome === 'invalid-tooLong') && <InvalidEntry isTooLong={outcome === 'invalid-tooLong'} />}
            {outcome === 'unknown' && <UnknownWord />}
            {outcome === 'error' && <Error wordToCheck={wordToCheck} />}
            {outcome === 'invalid-cannotMake' && <MaxTileLimitExceeded />}
            {outcome === 'valid' && <ValidWord wordToCheck={wordToCheck.toLowerCase()} />}
            <MobileBar
                setModalVisibility={setModalVisibility}
                isStoreSearchHistory={isStoreSearchHistory}
            />
        </main>
    );
}
