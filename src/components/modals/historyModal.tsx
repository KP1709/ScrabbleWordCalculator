import { HistoryModalType } from "../../reusableTypes/ModalProperties";
import styles from "./modal.module.css";
import Modal from "./modal";

interface SearchHistoryViewProps {
    searchHistory: string[];
    setWordToCheck: (word: string) => void;
    onClose: () => void;
}

const SearchHistoryView = ({ searchHistory, setWordToCheck, onClose }: SearchHistoryViewProps) => {
    if (searchHistory.length === 0) {
        return <p>No search history available.</p>;
    }

    return (
        <ul className={styles.modalList}>
            {searchHistory.map((word: string, index: number) => (
                <li key={index} onClick={() => { setWordToCheck(word); onClose(); }}>{word}</li>
            ))}
        </ul>
    );
};

const HistoryModal = ({ isOpen, onClose, setWordToCheck }: HistoryModalType) => {
    if (!isOpen) return null;

    const searchHistory = JSON.parse(sessionStorage.getItem("searchHistory") || "[]");

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Search history</h2>
            <SearchHistoryView searchHistory={searchHistory} setWordToCheck={setWordToCheck} onClose={onClose} />
        </Modal>
    );

};

export default HistoryModal;