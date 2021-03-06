import { createGlobalStyle } from "styled-components"

import { Colors } from "../utilities"

const GlobalStyle = createGlobalStyle`
/* @import url('https://fonts.googleapis.com/css?family=Bungee|Roboto+Mono'); */
html {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  /* font-family: 'Roboto Mono', monospace; */
  font-family: Tahoma, Geneva, Verdana, sans-serif;
  background-color: ${Colors.PRIMARY_DARK};

  *, *::before, *::after {
    box-sizing: inherit;
  }
}
body {
  margin: 0 auto;
  background: ${Colors.PRIMARY_DARK};
  box-shadow: 5px 5px 5px #000000aa;
  color: #eee;
  text-shadow: 2px 4px 30px black;
  position: relative;
}

h1, h2, h3 {
  font-family: 'Bungee', cursive;
  padding-left: 1.3rem;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.75rem;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.4rem;
  font-weight: 100;
}
h5 {
  font-size: 1.3rem;
}


p {
  font-size: 1.2rem;
  overflow-wrap: break-word;
  padding: 1.2rem;
}

ul, ol, li {
  margin-left: 1rem;
} 

a {
  color: #fff200;
  text-decoration: underline;
}

li {
  margin-bottom: calc(1.45rem / 2);
}
ol li {
  padding-left: 0;
}
ul li {
  padding-left: 0;
}
li > ol {
  margin-left: 1.45rem;
  margin-bottom: calc(1.45rem / 2);
  margin-top: calc(1.45rem / 2);
}
li > ul {
  margin-left: 1.45rem;
  margin-bottom: calc(1.45rem / 2);
  margin-top: calc(1.45rem / 2);

}
button {
  font-family: 'Roboto Mono', monospace;
  font-size: 1.2rem;
}

iframe {
  margin: 0 auto;
  display: block;
}

.center {
  text-align: center;
  display: flex;
  justify-content: center;
}

@media only screen and (max-width: 750px) {
  html {
    font-size: 90%;
  }
  h1, h2, h3, p, ul, li {
  padding-left: 0;
}

  iframe {
    width: 100%;
  }

}

hr {
  margin: 2rem 0;
}
`

export default GlobalStyle
