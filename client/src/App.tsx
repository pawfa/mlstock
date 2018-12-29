import * as React from 'react';
import './App.css';
import {Chart} from "./components/Chart";

export interface AppState {
    data: string[][]
}

class App extends React.Component<{},AppState> {

    public state = {
        data: []
    };

    public componentDidMount() {
        this.callApi().then(
            (data) => this.setState({
                data: data.data
            })
        ).catch(
            err => console.log(err)
        )
    }

    public render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Chart data={this.state.data}/>
            </div>
        );
    }

    private callApi = async () => {
        const response = await fetch('/api/data');
        const body = await response.json();
        if(response.status !== 200) {
            throw Error(body.message);
        }
        return body;
    };
}

export default App;
