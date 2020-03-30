import React from 'react';
import YoutubeVideo from './YoutubeVideo';

const YoutubeList = ({ youtubeList }) => {
    return (
        <div className="youtube-list">
            {youtubeList.map((youtubeItem) => {
                return (
                    < YoutubeVideo
                        key={youtubeItem.id.videoId}
                        videoImg={youtubeItem.snippet.thumbnails.high.url}
                        videoTitle={youtubeItem.snippet.title}
                    />
                )
            })}
        </div>
    )
}

export default YoutubeList;