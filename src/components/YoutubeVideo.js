import React from 'react';
import styled from 'styled-components';

const Video = styled.a`
    width: calc(33.3% - 40px);
    margin: 20px;
    box-shadow: 0 0 3px 0.5px rgba(0,0,0,0.15);
    border-radius: 4px;

    @media (max-width: 993px) {
        width: calc(50% - 40px);
    }

    @media (max-width: 769px) {
        width: calc(100% - 40px);
    }
`

const VideoTitle = styled.div`
    h2 {
        font-size: 22px;
        padding: 0 15px;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    @media (max-width: 412px) {
        h2 {
            font-size: 16px;
        }
    }
`

const VideoImg = styled.div`
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
`

const YoutubeVideo = ({
    videoId,
    videoImg,
    videoTitle
}) => {
    return (
        <Video href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
            <VideoImg>
                <img src={`${videoImg}`} alt={`${videoTitle}的封面圖`} />
            </VideoImg>
            <VideoTitle>
                <h2>{videoTitle}</h2>
            </VideoTitle>
        </Video >
    )
}

export default YoutubeVideo;