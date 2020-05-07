import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import YoutubeList from '../YoutubeList/YoutubeList';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import useYoutubeSearch from '../../hooks/useYoutubeSearch';
import { youtubeConfig } from '../../configs/youtubeConfig';
import { Main } from './YoutubePageStyle';

const YoutubePage = ({ addCacheToStore, youtubeSearchCache }) => {

    const [searchData, changeValue, startSearch] = useYoutubeSearch(handleSearch)
    const [youtubeList, setYoutubeList] = useState(null)
    const [pageToken, setPageToken] = useState('')
    const [setIsFetching] = useInfiniteScroll(getYoutubeListFromAPI)

    function handleSearch() {
        const searchKeyWord = searchData.keyWord
        window.scrollTo(0, 0)
        if (searchKeyWord) {
            const cacheData = getSearchCache(searchKeyWord)
            resetYoutubeList(cacheData)
        } else {
            alert('請輸入搜尋內容')
        }
    }

    function getSearchCache(searchKeyWord) {
        const searchCacheKeyList = Object.keys(youtubeSearchCache)
        const cacheKey = searchCacheKeyList.find(key => key === searchKeyWord)
        if (cacheKey) {
            return youtubeSearchCache[cacheKey]
        } return null
    }

    function resetYoutubeList(cacheData) {
        setYoutubeList([])
        setPageToken('')
        setIsFetching(false)
        cacheData ? setYoutubeListCacheToState(cacheData) : getYoutubeListFromAPI()
    }

    function setYoutubeListCacheToState(cacheData) {
        setYoutubeList(cacheData.youtubeList)
        setPageToken(cacheData.pageToken)
    }

    function getYoutubeListFromAPI() {
        const searchKeyWord = searchData.keyWord
        const searchUrl = setSearchApiUrl(searchKeyWord, pageToken)
        axios.get(searchUrl)
            .then((response) => {
                const newYoutubeList = response.data.items
                const nextPageToken = response.data.nextPageToken
                if (pageToken) {
                    setYoutubeList(prevYoutubeList => {
                        return [...prevYoutubeList, ...newYoutubeList]
                    })
                    setPageToken(nextPageToken)
                    setIsFetching(false)
                } else {
                    setYoutubeList(newYoutubeList)
                    setPageToken(nextPageToken)
                    setIsFetching(false)
                }
            })
    }

    useEffect(() => {
        const searchKeyWord = searchData.keyWord
        addCacheToStore(searchKeyWord, youtubeList, pageToken)
    }, [searchData.keyWord, youtubeList, pageToken])

    function setSearchApiUrl(searchKeyWord, pageToken) {
        const searchUrl = `${youtubeConfig.baseUrl}/search?part=snippet&type=video
                                &maxResults=${youtubeConfig.maxResults}&q=${searchKeyWord}
                                &key=${youtubeConfig.apiKey}&pageToken=${pageToken}`
        return searchUrl
    }

    if (youtubeList === null) {
        return (
            <SearchBar
                searchValue={searchData.inputValue}
                changeValue={changeValue}
                handleSearch={startSearch}
            />
        )
    } else {
        console.log('render function')
        console.log(youtubeList)
        return (
            <Main>
                <SearchBar
                    searchValue={searchData.inputValue}
                    changeValue={changeValue}
                    handleSearch={startSearch}
                />
                <YoutubeList youtubeList={youtubeList} />
            </Main >
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





/***  Class Style ***/

// class YoutubePage extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             youtubeList: null,
//             searchValue: '熱門音樂',
//             searchKeyWord: '熱門音樂',
//             pageToken: '',
//             isPrePageRender: true
//         }
//     }

//     componentDidMount() {
//         this.handleSearch()
//         window.addEventListener('scroll', this.handleScroll)
//     }

//     componentWillUnmount() {
//         window.removeEventListener('scroll', this.handleScroll)
//     }

//     handleScroll = () => {
//         const { isPrePageRender } = this.state
//         if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && isPrePageRender) {
//             this.setState({
//                 isPrePageRender: false
//             }, this.getYoutubeListFromAPI)
//         }
//     }

//     handleSearch = () => {
//         const { searchValue } = this.state
//         window.scrollTo(0, 0)
//         if (searchValue) {
//             this.setPreSearchToCache()
//             const cacheData = this.getSearchCache(searchValue)
//             this.resetYoutubeList(searchValue, cacheData)
//         } else {
//             alert('請輸入搜尋內容')
//         }
//     }

//     setPreSearchToCache = () => {
//         const { addCacheToStore } = this.props
//         const { searchKeyWord, youtubeList, pageToken } = this.state
//         addCacheToStore(searchKeyWord, youtubeList, pageToken)
//     }

//     getSearchCache = (searchValue) => {
//         const { youtubeSearchCache } = this.props
//         const searchCacheKeyList = Object.keys(youtubeSearchCache)
//         const cacheKey = searchCacheKeyList.find(key => key === searchValue)

//         if (cacheKey) {
//             return youtubeSearchCache[cacheKey]
//         } return null
//     }

//     resetYoutubeList = (searchValue, cacheData) => {
//         this.setState({
//             youtubeList: null,
//             pageToken: '',
//             isPrePageRender: true,
//             searchKeyWord: searchValue
//         }, cacheData ? () => this.setYoutubeListCacheToState(cacheData) : this.getYoutubeListFromAPI)
//     }

//     setYoutubeListCacheToState = (cacheData) => {
//         this.setState({
//             youtubeList: cacheData.youtubeList,
//             pageToken: cacheData.pageToken,
//         })
//     }

//     getYoutubeListFromAPI = () => {
//         const { searchKeyWord, pageToken } = this.state
//         const searchUrl = this.setSearchApiUrl(searchKeyWord, pageToken)

//         axios.get(searchUrl)
//             .then((response) => {
//                 const youtubeListData = response.data.items
//                 const nextPageToken = response.data.nextPageToken

//                 if (pageToken) {
//                     this.setState(preState => ({
//                         youtubeList: [
//                             ...preState.youtubeList,
//                             ...youtubeListData
//                         ],
//                         pageToken: nextPageToken,
//                         isPrePageRender: true
//                     }))
//                 } else {
//                     this.setState({
//                         youtubeList: youtubeListData,
//                         pageToken: nextPageToken,
//                         isPrePageRender: true
//                     })
//                 }
//             })
//     }

//     setSearchApiUrl = (searchValue, pageToken) => {
//         const searchUrl = `${youtubeConfig.baseUrl}/search?part=snippet&type=video
//                                 &maxResults=${youtubeConfig.maxResults}&q=${searchValue}
//                                 &key=${youtubeConfig.apiKey}&pageToken=${pageToken}`
//         return searchUrl
//     }

//     changeValue = (e) => {
//         e.persist()
//         this.setState({
//             searchValue: e.target.value
//         })
//     }

//     render() {
//         const { youtubeList, searchValue } = this.state
//         if (youtubeList === null) {
//             return (
//                 <SearchBar
//                     searchValue={searchValue}
//                     changeValue={this.changeValue}
//                     handleSearch={this.handleSearch}
//                 />
//             )
//         } return (
//             <Main>
//                 <SearchBar
//                     searchValue={searchValue}
//                     changeValue={this.changeValue}
//                     handleSearch={this.handleSearch}
//                 />
//                 <YoutubeList youtubeList={youtubeList} />
//             </Main>
//         )
//     }
// }