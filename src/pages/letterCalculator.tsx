import { useState } from "react";
import styles from "./letterCalculator.module.css";
import checkOutcome, { Outcome } from "../hooks/useCheckOutcome";
import HowToModal from "../components/modals/howToModal";
import SettingsModal from "../components/modals/settingsModal";
import MobileBar from "../components/mobileBar/mobileBar";
import HistoryModal from "../components/modals/historyModal";
import { useSettings } from "../hooks/useSettings";
import OutcomeView from "../components/outcomeView";

const LetterCalculator = () => {
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
                        className={styles.form__input__text}
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
                        className={styles.form__input__button}
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

            <OutcomeView outcome={outcome} wordToCheck={wordToCheck} />
            <MobileBar
                setModalVisibility={setModalVisibility}
                isStoreSearchHistory={isStoreSearchHistory}
            />
        </main>
    );
};

export default LetterCalculator;
