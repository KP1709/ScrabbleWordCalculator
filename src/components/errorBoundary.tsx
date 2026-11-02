import { Component, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Error has been thrown in rendering</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;