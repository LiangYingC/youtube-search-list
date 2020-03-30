import React from 'react';

const YoutubeVideo = ({
    videoImg,
    videoTitle
}) => {
    return (
        <div className="youtube-vedio">
            <div className="vedio-img">
                <img src={`${videoImg}`} alt={`${videoTitle}的封面圖`} />
            </div>
            <div className="vedio-title">
                <h2>{videoTitle}</h2>
            </div>
        </div >
    )
}

export default YoutubeVideo;