import { HistoryModalType } from "../../reusableTypes/ModalProperties";
import "../../styles/modal.css";
import Modal from "./modal";

const HistoryModal = ({ isOpen, onClose, setWordToCheck }: HistoryModalType) => {
    if (!isOpen) return null;

    const searchHistory = JSON.parse(sessionStorage.getItem("searchHistory") || "[]");

    const SearchHistoryView = () => {
        if (searchHistory.length === 0) {
            return <p>No search history available.</p>;
        }
        else {
            return (
                <ul className='modal-list'>
                    {searchHistory.map((word: string, index: number) => (
                        <li key={index} onClick={() => { setWordToCheck(word); onClose(); }}>{word}</li>
                    ))}
                </ul>
            );
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2>Search history</h2>
            <SearchHistoryView />
        </Modal>
    );

};

export default HistoryModal;