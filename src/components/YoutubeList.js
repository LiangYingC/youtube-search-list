import React from 'react';
import styled from 'styled-components';
import YoutubeVideo from './YoutubeVideo';
import './YoutubeList.css';

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
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