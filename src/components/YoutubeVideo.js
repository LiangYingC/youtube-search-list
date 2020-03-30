import React from 'react';
import styled from 'styled-components';

const Video = styled.a`
    width: 33.3%;
`


const YoutubeVideo = ({
    videoId,
    videoImg,
    videoTitle
}) => {
    return (
        <Video href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank">
            <div className="vedio-img">
                <img src={`${videoImg}`} alt={`${videoTitle}的封面圖`} />
            </div>
            <div className="vedio-title">
                <h2>{videoTitle}</h2>
            </div>
        </Video >
    )
}

export default YoutubeVideo;