import React, { Component } from 'react';
import { Button } from 'reactstrap';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <Button color="success">Get started</Button>
            </div>
        );
    }
}

export default App;
