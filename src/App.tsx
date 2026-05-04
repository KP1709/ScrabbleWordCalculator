import Header from "./components/header";
import LetterCalculator from "./pages/letterCalculator";
import ErrorBoundary from "./components/errorBoundary";
import { useSettings } from "./hooks/useSettings.tsx";
import "./styles/app.css";
import { useEffect } from "react";

export default function App() {
  const { setIsStoreSearchHistory, setIsWordToBeChecked, setIsExtendedCheck, handleThemeSelection } = useSettings();

  useEffect(() => {
    if (!sessionStorage.getItem("isWordToBeChecked")) {
      setIsWordToBeChecked(true);
      sessionStorage.setItem("isWordToBeChecked", 'true');
    }
    if (!sessionStorage.getItem("isExtendedCheck")) {
      setIsExtendedCheck(true);
      sessionStorage.setItem("isExtendedCheck", 'true');
    }
    if (!sessionStorage.getItem("searchHistory")) {
      sessionStorage.setItem("searchHistory", JSON.stringify([]));
    }
    if (!sessionStorage.getItem("isStoreSearchHistory")) {
      setIsStoreSearchHistory(true);
      sessionStorage.setItem("isStoreSearchHistory", 'true');
    }
    if (!sessionStorage.getItem("currentTheme")) {
      sessionStorage.setItem("currentTheme", 'light-theme');
    }
    else {
      handleThemeSelection(sessionStorage.getItem("currentTheme")?.replace(/"/g, "") || 'light-theme');
    }
  }, []);

  return (
    <ErrorBoundary>
      <Header />
      <LetterCalculator />
    </ErrorBoundary>
  );
}
