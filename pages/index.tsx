import { config } from '@fortawesome/fontawesome-svg-core';
import { NextPage } from 'next';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Contact from '../components/Contact';
import Rocketeers from '../components/Rocketeers';
import styles from '../styles/index.module.scss';

config.autoAddCss = false;

const Index: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Rocketeers />
      </main>
      <footer className={styles.footer}>
        <Contact />
      </footer>
    </div>
  );
};

export default Index;
