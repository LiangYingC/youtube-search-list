import React from 'react';
import YoutubeVideo from '../YoutubeVideo/YoutubeVideo';
import { List } from './YoutubeListStyle';

const YoutubeList = ({ youtubeList }) => {
    return (
        <List>
            {youtubeList.map((youtubeItem, index) => {
                return (
                    < YoutubeVideo
                        key={index}
                        videoId={youtubeItem.id.videoId}
                        videoImg={youtubeItem.snippet.thumbnails.medium.url}
                        videoTitle={youtubeItem.snippet.title}
                    />
                )
            })}
        </List>
    )
}

export default YoutubeList;