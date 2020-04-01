import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import YoutubeList from './YoutubeList';

const youtubeConfig = {
    apiKey: 'AIzaSyDhMZpj7wlmXuT1iV5UjSQ5_uB5KhPDBp8',
    baseUrl: 'https://www.googleapis.com/youtube/v3',
    order: 'relevance',
    maxResults: 10
}

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
            pageToken: ''
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
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 450) {
            console.log('show')
        }
    }

    handleSearch = () => {
        const {
            searchValue,
            pageToken
        } = this.state
        const searchVedioUrl = `${youtubeConfig.baseUrl}/search?part=snippet&type=video
                            &order=${ youtubeConfig.order}&maxResults=10&q=${searchValue ? searchValue : '熱門音樂'}
                            &key=${youtubeConfig.apiKey}&pageToken`
        console.log(searchVedioUrl)
        this.getYoutubeList(searchVedioUrl)
    }

    getYoutubeList = (searchVedioUrl) => {
        axios.get(searchVedioUrl)
            .then((response) => {
                console.log(response)
                const youtubeListData = response.data.items
                console.log(youtubeListData)
                this.setState({
                    youtubeList: youtubeListData
                })
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