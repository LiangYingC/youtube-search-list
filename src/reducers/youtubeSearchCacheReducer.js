const initialState = {
    youtubeSearchCache: {}
}

export const youtubeSearchCacheReducer = (state = initialState, action) => {
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