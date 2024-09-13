import Header from "./components/header"
import LetterCalculator from "./components/letterCalculator"
import ErrorBoundary from "./components/errorBoundary"
import "./styles/app.css"

export default function App() {
  return (
    <ErrorBoundary>
      <Header />
      <LetterCalculator/>
    </ErrorBoundary>
  )
}
