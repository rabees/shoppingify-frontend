import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root{
  //colors
  --color-primary: #f9a109;

  //fonts
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.5rem;
  --font-size-xl: 1.625rem;
}
  *::-webkit-scrollbar {
    width: 12px;
  }

  *::-webkit-scrollbar-track {
    background: #ffffff;
     /* margin-top: 100px; */
    /* margin-bottom: 100px; */
  }

  *::-webkit-scrollbar-thumb {
    background-color: rgb(184,184,184);
    border-radius: 12px;
    border: 3px solid #ffffff;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box ;
    font-family: 'Quicksand', sans-serif;

    //Scrollbar
    scrollbar-width: thin;
    scrollbar-color: #f9a109 #ffffff;
  }
  p ,h1,h2,h3,h4,h5{
    font-weight: 600 ;
  }
  button{
    cursor:pointer;
  }
  li{
    list-style-type: none;
  }

`;

export default GlobalStyle;
