import { createContext, useContext, useState, ReactNode } from "react";

type SettingsContextType = {
    isWordToBeChecked: boolean;
    isExtendedCheck: boolean;
    isStoreSearchHistory: boolean;
    setIsWordToBeChecked: (value: boolean) => void;
    setIsExtendedCheck: (value: boolean) => void;
    setIsStoreSearchHistory: (checked: boolean) => void;
    rerender: number;
    setRerender: React.Dispatch<React.SetStateAction<number>>;
    currentTheme: string;
    handleWordCheck: (checked: boolean) => void;
    handleExtendedWordCheck: (checked: boolean) => void;
    handleSearchHistory: (checked: boolean) => void;
    handleThemeSelection: (theme: string) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const getSettingValue = (key: string, defaultValue = false) => {
    return sessionStorage.getItem(key) === "true" ? true : defaultValue;
};

const setSettingValue = (key: string, value: boolean) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

export function SettingsProvider({ children }: { children: ReactNode; }) {
    const [isWordToBeChecked, setIsWordToBeChecked] = useState(() => getSettingValue("isWordToBeChecked"));
    const [isExtendedCheck, setIsExtendedCheck] = useState(() => getSettingValue("isExtendedCheck"));
    const [isStoreSearchHistory, setIsStoreSearchHistory] = useState(() => getSettingValue("isStoreSearchHistory"));
    const [rerender, setRerender] = useState(0);

    const currentTheme = sessionStorage.getItem("currentTheme")?.replace(/"/g, "") || "";

    const handleWordCheck = (checked: boolean) => {
        setIsWordToBeChecked(checked);
        setSettingValue("isWordToBeChecked", checked);
        if (!checked) {
            setIsExtendedCheck(false);
            setSettingValue("isExtendedCheck", false);
            setIsStoreSearchHistory(false);
            setSettingValue("isStoreSearchHistory", false);
        }
    };

    const handleExtendedWordCheck = (checked: boolean) => {
        setIsExtendedCheck(checked);
        setSettingValue("isExtendedCheck", checked);
        if (checked && !isWordToBeChecked) {
            setIsWordToBeChecked(true);
            setSettingValue("isWordToBeChecked", true);
        }
    };

    const handleSearchHistory = (checked: boolean) => {
        setIsStoreSearchHistory(checked);
        setSettingValue("isStoreSearchHistory", checked);
        if (checked && !isWordToBeChecked) {
            setIsWordToBeChecked(true);
            setSettingValue("isWordToBeChecked", true);
        }
    };

    const handleThemeSelection = (theme: string) => {
        document.body.setAttribute("data-theme", theme);
        sessionStorage.setItem("currentTheme", JSON.stringify(theme));
        setRerender(n => n + 1); // Force re-render to update dropdown
    };

    return (
        <SettingsContext.Provider
            value={{
                isWordToBeChecked,
                isExtendedCheck,
                isStoreSearchHistory,
                setIsWordToBeChecked,
                setIsExtendedCheck,
                setIsStoreSearchHistory,
                rerender,
                setRerender,
                currentTheme,
                handleWordCheck,
                handleExtendedWordCheck,
                handleSearchHistory,
                handleThemeSelection,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
