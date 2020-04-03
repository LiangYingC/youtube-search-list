import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import YoutubePage from './components/YoutubePage/YoutubePage';
import { GlobalStyle } from './styles/globalStyle';
import { youtubeSearchCacheReducer } from './reducers/youtubeSearchCacheReducer';

const store = createStore(youtubeSearchCacheReducer)

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <GlobalStyle />
                <YoutubePage />
            </Provider>
        )
    }
}

export default App;