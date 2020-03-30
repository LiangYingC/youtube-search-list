import React, { Component } from 'react';
import YoutubePage from './components/YoutubePage';
import { GlobalStyle } from './styles/globalStyle';

class App extends Component {
    render() {
        return (
            <>
                <GlobalStyle />
                <YoutubePage />
            </>
        )
    }
}

export default App;