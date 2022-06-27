import { faGithub, faLinkedin, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

import styles from './contact.module.scss';

type LinkType = {
  icon: IconDefinition;
  name: string;
  handle: string;
  href: string;
};

export default function Contact(): JSX.Element {
  const links: LinkType[] = [
    {
      icon: faGithub,
      name: 'github',
      handle: '@saifbechan',
      href: 'https://github.com/saifbechan',
    },
    {
      icon: faLinkedin,
      name: 'linkedIn',
      handle: '/in/saifbechan',
      href: 'https://www.linkedin.com/in/saifbechan/',
    },
  ];

  return (
    <div className={styles.contact}>
      {links.map(
        (link: LinkType): JSX.Element => (
          <section className={styles.link} id={link.name} key={link.name}>
            <a href={link.href} rel="noreferrer" target="_blank">
              {`${link.name}: ${link.handle}`}
              <FontAwesomeIcon icon={link.icon} />
            </a>
          </section>
        )
      )}
      <div className={styles.imagewrapper}>
        <Image alt="Rocketeer" src="/images/rocketeer.webp" layout="fill" />
      </div>
    </div>
  );
}
