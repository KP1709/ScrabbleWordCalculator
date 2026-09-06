import styles from './responseInterface.module.css';

const IsAnalysing = () => {
    return (
        <div className={`flex-centre-column ${styles.responseInterface}`}>
            <h2>Analysing...</h2>
        </div>
    );
};

export default IsAnalysing;