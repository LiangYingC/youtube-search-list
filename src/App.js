import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import YoutubePage from './components/YoutubePage/YoutubePage';
import { GlobalStyle } from './styles/globalStyle';

const initialState = {
    youtubeSearchCache: {}
}

const youtubeSearchCacheReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_YOUTUBE_CACHE':
            return {
                ...state,
                youtubeSearchCache: {
                    ...state.youtubeSearchCache,
                    [action.searchKeyWord]: {
                        youtubeList: action.youtubeList,
                        pageToken: action.pageToken
                    }
                }
            }
        default:
            return state
    }
}

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