import * as React from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.scss';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#141526" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="react, typescript, javascript, p5js, github, nextjs, machine learning, genetic algorithm"
        />
      </Head>
      <Script
        id="ga-datalayer"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q372V016YB');
            `,
        }}
      />
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q372V016YB" />
      <Component {...pageProps} />
    </>
  );
}
