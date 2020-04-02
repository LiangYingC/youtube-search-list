import styled from 'styled-components';

export const Video = styled.a`
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

export const VideoTitle = styled.div`
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

export const VideoImg = styled.div`
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
`