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
            }, this.getYoutubeList)
        }
    }

    handleSearch = () => {
        const { searchValue } = this.state

        if (searchValue) {
            this.setPreSearchToCache()
            const cacheData = this.getSearchCache(searchValue)
            this.resetYoutubeList(searchValue, cacheData)
        } else {
            alert('請輸入搜尋內容')
        }
    }

    setPreSearchToCache = () => {
        const { addCacheToStore } = this.props
        const { searchKeyWord, youtubeList, pageToken } = this.state
        addCacheToStore(searchKeyWord, youtubeList, pageToken)
    }

    resetYoutubeList = (searchValue, cacheData) => {
        this.setState({
            youtubeList: null,
            pageToken: '',
            searchKeyWord: searchValue
        }, cacheData ? () => this.setCacheToState(cacheData) : this.getYoutubeList)
    }

    getSearchCache = (searchValue) => {
        const { youtubeSearchCache } = this.props
        const searchCacheKeyList = Object.keys(youtubeSearchCache)
        const cacheKey = searchCacheKeyList.find(key => key === searchValue)

        if (cacheKey) {
            return youtubeSearchCache[cacheKey]
        } return null
    }

    setCacheToState = (cacheData) => {
        this.setState({
            youtubeList: cacheData.youtubeList,
            pageToken: cacheData.pageToken,
        })
    }

    getYoutubeList = () => {
        const { searchKeyWord, pageToken } = this.state
        const searchUrl = this.setSearchApiUrl(searchKeyWord, pageToken)
        axios.get(searchUrl)
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

    setSearchApiUrl = (searchValue, pageToken) => {
        const searchUrl = `${youtubeConfig.baseUrl}/search?part=snippet&type=video
                                &maxResults=${youtubeConfig.maxResults}&q=${searchValue}
                                &key=${youtubeConfig.apiKey}&pageToken=${pageToken}`
        return searchUrl
    }

    changeValue = (e) => {
        e.persist()
        this.setState({
            searchValue: e.target.value
        })
    }

    render() {
        const { youtubeList, searchValue } = this.state
        if (youtubeList === null) {
            return (
                <SearchBar
                    searchValue={searchValue}
                    changeValue={this.changeValue}
                    handleSearch={this.handleSearch}
                />
            )
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