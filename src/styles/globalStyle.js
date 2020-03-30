import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    *{
        box-sizing: border-box; 
        color: #555555;
        text-decoration: none;
    }
    html {
        width: 100vw;
        height: auto;
        font-family: 'HelveticaNeue', Helvetica, Arial, 'Lucida Grande', sans-serif;
    }
    body {
        width: 100vw;
        height: auto;
    }
    #root {
        width: 100vw;
    }
    h2 {
        letter-spacing: 1.2px;
        line-height: 1.5;
    }
    a {
        display: block;
    } 
    img {
        width: 100%;
        height: 100%;
    }
`
