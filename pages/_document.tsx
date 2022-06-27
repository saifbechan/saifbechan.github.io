import React from 'react';

import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

type Props = {
  lang: string;
};

class Document extends NextDocument<Props> {
  render(): JSX.Element {
    return (
      <Html lang={this.props.lang || 'en'}>
        <Head>
          <link
            rel="icon"
            href="/favicon.ico"
            type="image/x-icon"
            sizes="64x64 32x32 24x24 16x16"
          />
          <link rel="apple-touch-icon" href="/logo192.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Bungee+Outline&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@600&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Jura:wght@500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
