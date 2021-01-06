import { config } from '@fortawesome/fontawesome-svg-core';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Contact from '../components/Contact';
import Rocketeers from '../components/Rocketeers';
import styles from '../styles/index.module.scss';

config.autoAddCss = false;

const Index: NextPage = () => {
  return (
    <>
      <NextSeo
        title="saifbechan.me :: rocketeer 🚀"
        description="Main website of Saif Bechan showcasing some awesome web development skills. Using a genetic algorithm these rocketeers will find their path across the galaxy."
        canonical="https://www.canonical.ie/"
        openGraph={{
          url: 'https://saifbechan.me',
          title: 'saifbechan.me :: rocketeer 🚀',
          description:
            'Using a genetic algorithm these rocketeers will find their way across the galaxy.',
          images: [
            {
              url: 'https://saifbechan.me/images/preview.webp',
              width: 1280,
              height: 640,
              alt: 'saifbechan.me website preview',
            },
          ],
          site_name: 'Rocketeers',
          type: 'website',
        }}
        twitter={{
          handle: '@saifbechan',
          site: '@saifbechan',
          cardType: 'summary_large_image',
        }}
      />
      <div className={styles.container}>
        <main className={styles.main}>
          <Rocketeers />
        </main>
        <footer className={styles.footer}>
          <Contact />
        </footer>
      </div>
    </>
  );
};

export default Index;
