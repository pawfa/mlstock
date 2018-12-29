import * as React from "react";
import './Spinner.css';

interface SpinnerProps {
    active: boolean;
}

export class Spinner extends React.Component<SpinnerProps> {

    public render(): React.ReactNode {

        return <div >
            {this.props.active && <div className={'curtain'}><div className="loader"/></div>}
            {this.props.children}
        </div>
    }
}


