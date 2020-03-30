import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import YoutubeList from './YoutubeList';

const youtubeConfig = {
    apiKey: 'AIzaSyDhMZpj7wlmXuT1iV5UjSQ5_uB5KhPDBp8',
    baseUrl: 'https://www.googleapis.com/youtube/v3',
    order: 'relevance',
    maxResults: 10
}

class YoutubePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            youtubeList: null
        }
    }

    componentDidMount() {
        const searchVedioUrl = `${youtubeConfig.baseUrl}/search?part=snippet&type=video
                            &order=${ youtubeConfig.order}&maxResults=10&q=熱門影片&key=${youtubeConfig.apiKey}`
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
            <>
                <div className="youtube-page">
                    <div className="wrap">
                        {/* <SearchBar /> */}
                        <YoutubeList youtubeList={youtubeList} />
                    </div>
                </div>
            </>
        )
    }
}

export default YoutubePage;