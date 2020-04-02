import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import YoutubeList from '../YoutubeList/YoutubeList';
import { youtubeConfig } from '../../configs/youtubeConfig';
import { Main } from './YoutubePageStyle';

class YoutubePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            youtubeList: null,
            searchValue: '熱門音樂',
            searchKeyWord: '熱門音樂',
            pageToken: '',
            isPrePageRender: true
        }
    }

    componentDidMount() {
        this.handleSearch()
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        const { isPrePageRender } = this.state
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && isPrePageRender) {
            this.setState({
                isPrePageRender: false
            }, this.handleSearch)
        }
    }

    handleSearch = (e) => {
        const { searchValue } = this.state
        let { pageToken } = this.state

        const { addCacheToStore } = this.props
        const { searchKeyWord, youtubeList } = this.state
        addCacheToStore(searchKeyWord, youtubeList, pageToken)

        let isNewSearch
        e ? isNewSearch = true : isNewSearch = false

        let youtubeListCache = null
        if (isNewSearch) {
            if (searchValue) {
                const cacheData = this.checkSearchCache(searchValue)
                if (cacheData) {
                    youtubeListCache = cacheData.youtubeList
                    pageToken = cacheData.pageToken
                }
            }
        }
        const searchVedioUrl = `${youtubeConfig.baseUrl}/search?part=snippet&type=video
                                &maxResults=${youtubeConfig.maxResults}&q=${searchValue}
                                &key=AIzaSyAdjEsVveMWoqUjvz59GS3KMAwfsBVvKjQ&pageToken=${pageToken}`
        isNewSearch ?
            searchValue ? this.resetYoutubeList(searchVedioUrl, searchValue, pageToken, youtubeListCache) : alert('請輸入搜尋內容')
            : this.getYoutubeList(searchVedioUrl, pageToken)
    }

    checkSearchCache = (searchValue) => {
        const { youtubeSearchCache } = this.props
        const searchCacheKeyList = Object.keys(youtubeSearchCache)
        const cacheKey = searchCacheKeyList.find(key => key === searchValue)

        if (cacheKey) {
            return youtubeSearchCache[cacheKey]
        } return null
    }

    resetYoutubeList = (searchVedioUrl, searchValue, pageToken, youtubeListCache) => {
        if (youtubeListCache) {
            this.setState({
                youtubeList: youtubeListCache,
                pageToken: pageToken,
                searchKeyWord: searchValue
            })
        } else {
            this.setState({
                youtubeList: null,
                pageToken: pageToken,
                searchKeyWord: searchValue
            }, () => { this.getYoutubeList(searchVedioUrl) })
        }
    }

    getYoutubeList = (searchVedioUrl, pageToken) => {
        console.log(searchVedioUrl)
        axios.get(searchVedioUrl)
            .then((response) => {
                const youtubeListData = response.data.items
                const nextPageToken = response.data.nextPageToken

                if (pageToken) {
                    this.setState(preState => ({
                        youtubeList: [
                            ...preState.youtubeList,
                            ...youtubeListData
                        ],
                        pageToken: nextPageToken,
                        isPrePageRender: true
                    }))
                } else {
                    this.setState({
                        youtubeList: youtubeListData,
                        pageToken: nextPageToken
                    })
                }
            })
    }

    changeValue = (e) => {
        e.persist()
        this.setState({
            searchValue: e.target.value
        })
    }

    render() {
        const { youtubeList, searchValue } = this.state

        const { youtubeSearchCache } = this.props

        if (youtubeList === null) {
            return <div></div>
        } return (
            <Main>
                <SearchBar
                    searchValue={searchValue}
                    changeValue={this.changeValue}
                    handleSearch={this.handleSearch}
                />
                <YoutubeList youtubeList={youtubeList} />
            </Main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        youtubeSearchCache: state.youtubeSearchCache
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCacheToStore: (searchKeyWord, youtubeList, pageToken) => dispatch({
            type: 'ADD_YOUTUBE_CACHE',
            searchKeyWord: searchKeyWord,
            youtubeList: youtubeList,
            pageToken: pageToken
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YoutubePage);