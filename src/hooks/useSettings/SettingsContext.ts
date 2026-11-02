import { createContext } from "react";

export type SettingsContextType = {
    isWordToBeChecked: boolean;
    isStoreSearchHistory: boolean;
    setIsWordToBeChecked: (value: boolean) => void;
    setIsStoreSearchHistory: (checked: boolean) => void;
    rerender: number;
    setRerender: React.Dispatch<React.SetStateAction<number>>;
    currentTheme: string;
    handleWordCheck: (checked: boolean) => void;
    handleSearchHistory: (checked: boolean) => void;
    handleThemeSelection: (theme: string) => void;
};

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
