import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {

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
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div>
                    {this.state.data}
                </div>
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
