import { useState } from "react";
import styles from "./letterCalculator.module.css";
import checkOutcome, { Outcome } from "../hooks/useCheckOutcome";
import HowToModal from "../components/modals/howToModal";
import SettingsModal from "../components/modals/settingsModal";
import MobileBar from "../components/mobileBar/mobileBar";
import HistoryModal from "../components/modals/historyModal";
import { useSettings } from "../hooks/useSettings";
import OutcomeView from "../components/outcomeView";
import { lookupLettersFromWord } from "../lib/lookupLettersFromWord";

const outcomeAnnouncements: Record<Exclude<Outcome, 'valid'>, string> = {
    start: "Enter a word to begin.",
    analysing: "Checking word.",
    invalid: "The entry is invalid.",
    "invalid-tooLong": "The word is too long.",
    unknown: "The word was not found in the dictionary.",
    "invalid-cannotMake": "The word cannot be made with the available tiles.",
    error: "There was an error checking the word.",
};

const LetterCalculator = () => {
    const [wordToCheck, setWordToCheck] = useState("");
    const [outcome, setOutcome] = useState<Outcome>('start');
    const [modalVisibility, setModalVisibility] = useState({ howTo: false, settings: false, history: false });

    const { isStoreSearchHistory, setIsStoreSearchHistory } = useSettings();

    const outcomeAnnouncement = outcome === 'valid'
        ? `The word is valid. Word total: ${lookupLettersFromWord(wordToCheck.toLowerCase())
            .reduce((total, tile) => total + tile.score, 0)} points.`
        : outcomeAnnouncements[outcome];

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
                        className={styles.formInputText}
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
                        className={styles.formInputButton}
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

            <div
                className={styles.srOnly}
                role="status"
                aria-live="polite"
                aria-atomic="true">
                {outcomeAnnouncement}
            </div>
            <OutcomeView outcome={outcome} wordToCheck={wordToCheck} />
            <MobileBar
                setModalVisibility={setModalVisibility}
                isStoreSearchHistory={isStoreSearchHistory}
            />
        </main>
    );
};

export default LetterCalculator;
