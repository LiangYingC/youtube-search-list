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

const Main = styled.div`
    width: 100%;
`

const Wrap = styled.div`
    width: 80%;
    margin: 0 auto;
`

class YoutubePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            youtubeList: null
        }
    }

    componentDidMount() {
        const searchVedioUrl = `${youtubeConfig.baseUrl}/search?part=snippet&type=video
                            &order=${ youtubeConfig.order}&maxResults=10&q=熱門音樂&key=${youtubeConfig.apiKey}`
        axios.get(searchVedioUrl)
            .then((response) => {
                const youtubeListData = response.data.items
                console.log(youtubeListData)
                this.setState({
                    youtubeList: youtubeListData
                })
            })
    }

    render() {
        const { youtubeList } = this.state
        if (youtubeList === null) {
            return <div></div>
        } return (
            <Main>
                <Wrap>
                    {/* <SearchBar /> */}
                    <YoutubeList youtubeList={youtubeList} />
                </Wrap>
            </Main>
        )
    }
}

export default YoutubePage;