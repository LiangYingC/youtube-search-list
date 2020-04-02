import React from 'react';
import YoutubeVideo from '../YoutubeVideo/YoutubeVideo';
import { List } from './YoutubeListStyle';

const YoutubeList = ({ youtubeList }) => {
    console.log(youtubeList)
    return (
        <List>
            {youtubeList.map((youtubeItem) => {
                return (
                    < YoutubeVideo
                        key={youtubeItem.id.videoId}
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