import React from 'react';

const YoutubeList = ({ youtubeList }) => {
    return (
        <div className="youtube-list">
            {youtubeList.map((youtubeItem) => {
                return (
                    <div className="youtube-vedio" key={`${youtubeItem.id.videoId}`}>
                        <div className="vedio-img">
                            <img src={`${youtubeItem.snippet.thumbnails.high.url}`} alt="" />
                        </div>
                        <div className="vedio-title">
                            <h2>{youtubeItem.snippet.title}</h2>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default YoutubeList;