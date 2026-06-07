type ModalProps = {
    isOpen: boolean,
    onClose: () => void;
};

export type SettingsModalType =
    ModalProps & {
        isStoreSearchHistory: boolean,
        setIsStoreSearchHistory: (value: boolean) => void;
    };


export type ModalType = ModalProps & {
    children: React.ReactNode;
};

export type HistoryModalType = ModalProps & {
    setWordToCheck: (value: string) => void,
};

export type HowToModalType = ModalProps;