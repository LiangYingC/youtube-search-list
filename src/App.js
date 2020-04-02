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
            console.log('ADD_YOUTUBE_CACHE')
            const newState = {
                ...state,
                youtubeSearchCache: {
                    ...state.youtubeSearchCache,
                    [action.searchKeyWord]: {
                        youtubeList: action.youtubeList,
                        pageToken: action.pageToken
                    }
                }
            }
            console.log(newState)
            return newState
        default:
            return state
    }
}

const store = createStore(youtubeSearchCacheReducer)

class App extends Component {
    render() {
        console.log('store')
        console.log(store.getState())
        return (
            <Provider store={store}>
                <GlobalStyle />
                <YoutubePage />
            </Provider>
        )
    }
}

export default App;