# next-carbon-base

## 1. Create Next App
```
npx create-next-app@latest next-carbon-base
cd next-carbon-base
yarn dev
```
start a commentary in README.md

create a git repo `next-carbon-base` and push first commit
```
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/cg2p/next-carbon-base.git
git push -u origin main
```

## 2. Create a Custom Document
Create a Custom Document that will update <html> and <body> on all pages ([docs](https://nextjs.org/docs/advanced-features/custom-document))

_document.js
```
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
        <Head>
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

## 3. Add the Carbon Design System
Install Carbon Design and Sass along with some other 
and SaaS
```
yarn add @carbon/react@1.1.0
yarn add sass@1.51.0
```
For NextJS and Sass you do not need the `SASS_PATH="node_modules"` entry in `.env`.

Setup `jsconfig.json` to make path coding more streamlined
```
//jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/src/*": ["src/*"]
    }
  }
}
```

Update `_app.js` to add in the Carbon theme to the app
```
import React, { Component } from 'react';
import { Content, Theme } from '@carbon/react';

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return (
    <>
    <Theme theme="g100">
      <div>text on every page because it is in _app.js</div>
    </Theme>
    <Content>
      <Component {...pageProps} />
    </Content>
    </>

  );
}

export default MyApp;
```

setup `index.js` to show a simple Carbon styled button
```
import { Button } from '@carbon/react';

const Home = () => {
  return (
        <Button>Button</Button>
    )
}

export default Home;
```

and add a second page to prove the common pieces
`pages/page2.js`
```
import React from 'react';

const Page2 = () => {
  return (
      <div>This is Page 2</div>;
      )
};

export default Page2;
```

## 4. Organise styling
Switch to Sass styling. 

Change `.css` to `.scss` for `global` and `Home.module` in the `styles` folder. Also modify the style import reference in `index.js` and `_app.js`.

Update `next.config.js` to compile in Sass:
```
/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
```

We are going to use the [Carbon Design React development tutorial](https://carbondesignsystem.com/developing/react-tutorial/overview) to help build the site up.

In Step 1 of the tutorial a number of initial styles are setup. 

Update `global.scss` to:
```
@use '@carbon/react';

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```
and update `Home.module.scss` to:
```
.container {
  text-align: center;
}

.main {
  background-color: #282c34;
  min-height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}
```
Now update `index.js` to be a simple Home page to pick up and prove the styles, including the Carbon styled button.
```
import Head from 'next/head';
import { Button } from '@carbon/react';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        This is the content you see on the Home page
      </div>
      <Button>Button</Button>

    </div>
  )
}
```
Later we will re-order page structure and styling and not need `Home.module.scss`

## 5. Build UI Shell and Pages
Using code from Step 2 and Step 4 of the tutorial we will setup the global header, the index Landing page and a basic second page `Page2`. This will demonstrate Carbon Design system and styling in action and responsive layout.

We now begin to introduce organised and reusable code:
- for each page in the `page` folder, return content that is wrapped by a common `Layout` this will allow for different layouts in the future such as `AdminLayout`
- inside the page's layout wrap, pulling the page content from `src/content` folders e.g. `src/content/LandingPage` folder
- each `src/content` folder can then assemble the `scss` and `js` needed for that page (see the tutorial)
- additionally build `src/components` folder for the common parts e.g. `Layout`
- with `Layout` structure being use we change `_app.js` back to the [guidance](https://nextjs.org/docs/advanced-features/custom-app) from NextJS

The structure now follows this pattern:
```
--public
  --images
    -- tab-illo.png
  --favicon.ico
--pages
  --api (folder not modified yet)
  -- _app.js
  -- _document.js
  -- index.js
  -- page2.js
--src
  --component
    --Info
       -- index.js
       -- Info.js
       -- _info.scss
    --Layout
       -- index.js
       -- Layout.js
       -- _layout.scss
    --PublicHeader
       -- index.js
       -- PublicHeader.js
       -- _public-header.scss
  --content
    --LandingPage
       -- index.js
       -- LandingPage.js
       -- _landing-page.scss
       -- _mixins.css
       -- _overrides.sccs
--styles
  -- global.scss
  -- app.scss
  -- Home.modules.scss (will be deleted, kept here as a reminder)

```
A copy of the pages at this stage are in [walkthrough / step 5]()

A new file `app.scss` in `styles` picks up the scss styles for each page. In NextJS, this needs to be imported by `_app.js`. We can use `app.scss` to pull in the app specific page styles. Its entries could equally go in `globals.scss` (already imported in `_app.js`) but this is the beginnings of organising files, and we need to look at optimising the Carbon build later.

`app.scss`
```
@use '@/src/content/LandingPage/landing-page';
@use '@/src/content/RepoPage/repo-page';
```

`landing.scss` needs to pull in the Info styles add `@use '@/src/components/Info/info.scss';`

## 6. Build in GraphQL API Support
For GraphQL support we will be guided by [Step 3](https://carbondesignsystem.com/developing/react-tutorial/step-3) of the Carbon Design tutorial. However we will need a code architecture to use different API calls, not just to GitHub.

In order to show GraphQL in action we create an `.env.local` with an access token for GitHub. In React apps this prefix is `REACT_APP_` but in NextJS it is `NEXT_PUBLIC
```
NEXT_PUBLIC_GITHUB_PERSONAL_ACCESS_TOKEN=xx
```

install Apollo and GraphQL
```
yarn add @apollo/client@3.4.10 graphql@15.5.2
```



https://www.freecodecamp.org/news/how-to-fetch-graphql-data-in-next-js-with-apollo-graphql/#step-1-adding-apollo-graphql-to-a-next-js-app 

https://github.com/jaydenseric/graphql-react 
https://github.com/vercel/next.js/tree/canary/examples/with-graphql-react



## Other Links
https://blog.logrocket.com/new-features-in-next-js-11/

## Reference
- [Minimal CSS with Carbon](https://medium.com/carbondesign/minimal-css-with-carbon-b0c089ccfa71)