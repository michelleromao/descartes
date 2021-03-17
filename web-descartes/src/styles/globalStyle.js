import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    scroll-behavior: smooth;
  }
  body{
    background-color: #E5E5E5;
    color: #D6692B;
    -webkit-font-smoothing: antialiased;
  }
  body,input,button{
    font-family: 'Nunito Sans', sans-serif;
    font-size: 16px;
  }
  h1,h2,h3,h4,h5,strong{
    font-weight: 400;
  }
  button{
    cursor: pointer;
    font-weight: 600;
  }
  a{
    text-decoration: none;
    font-weight: 600;
    color: #352166;
    font-size: 18px
  }
`