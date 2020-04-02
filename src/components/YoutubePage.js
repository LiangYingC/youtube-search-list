import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import YoutubeList from './YoutubeList';
import { youtubeConfig } from '../configs/youtubeConfig';

const Main = styled.main`
    width: 100%;
    padding: 20px;
`

class YoutubePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            youtubeList: null,
            searchValue: '',
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
        const {
            searchValue,
            pageToken,
        } = this.state

        let isNewSearch
        e ? isNewSearch = true : isNewSearch = false

        const searchVedioUrl = `${youtubeConfig.baseUrl}/search?part=snippet&type=video
                            &maxResults=${youtubeConfig.maxResults}&q=${searchValue ? searchValue : '熱門音樂'}
                            &key=${youtubeConfig.apiKey}&pageToken=${!isNewSearch ? pageToken : ''}`
        isNewSearch ?
            searchValue ? this.clearYoutubeList(searchVedioUrl) : ''
            : this.getYoutubeList(searchVedioUrl, pageToken)
    }

    clearYoutubeList = (searchVedioUrl) => {
        this.setState({
            youtubeList: null,
            pageToken: ''
        }, () => { this.getYoutubeList(searchVedioUrl) })
    }

    getYoutubeList = (searchVedioUrl, pageToken) => {
        console.log(searchVedioUrl)
        axios.get(searchVedioUrl)
            .then((response) => {
                const youtubeListData = response.data.items
                const nextPageToken = response.data.nextPageToken
                console.log('getYoutubeList')
                console.log(youtubeListData)
                console.log(pageToken)
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
        const {
            youtubeList,
            searchValue
        } = this.state
        console.log('render')
        console.log(youtubeList)
        console.log(this.state.pageToken)
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

export default YoutubePage;