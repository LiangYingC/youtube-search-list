import React from 'react';
import styled from 'styled-components';
import YoutubeVideo from './YoutubeVideo';
import './YoutubeList.css';

const List = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-top: 80px;
`
const YoutubeList = ({ youtubeList }) => {
    return (
        <List>
            {youtubeList.map((youtubeItem) => {
                return (
                    < YoutubeVideo
                        key={youtubeItem.id.videoId}
                        videoId={youtubeItem.id.videoId}
                        videoImg={youtubeItem.snippet.thumbnails.high.url}
                        videoTitle={youtubeItem.snippet.title}
                    />
                )
            })}
        </List>
    )
}

export default YoutubeList;