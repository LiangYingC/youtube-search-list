import React from 'react';
import {
    Video,
    VideoImg,
    VideoTitle
} from './YoutubeVideoStyle';

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