import { Outcome } from '../hooks/useCheckOutcome';
import StartScreen from './responseInterfaces/startScreen';
import InvalidEntry from './responseInterfaces/invalidEntry';
import IsAnalysing from './responseInterfaces/isAnalysing';
import UnknownWord from './responseInterfaces/unknownWord';
import MaxTileLimitExceeded from './responseInterfaces/maxTileLimitExceeded';
import ValidWord from './responseInterfaces/validWord';
import Error from './responseInterfaces/isError';

const OutcomeView = ({ outcome, wordToCheck }: { outcome: Outcome, wordToCheck: string; }) => {
    switch (outcome) {
        case 'start':
            return <StartScreen />;
        case 'analysing':
            return <IsAnalysing />;
        case 'invalid':
        case 'invalid-tooLong':
            return <InvalidEntry isTooLong={outcome === 'invalid-tooLong'} />;
        case 'unknown':
            return <UnknownWord />;
        case 'invalid-cannotMake':
            return <MaxTileLimitExceeded />;
        case 'error':
            return <Error wordToCheck={wordToCheck} />;
        case 'valid':
            return <ValidWord wordToCheck={wordToCheck.toLowerCase()} />;
    }
};

export default OutcomeView;