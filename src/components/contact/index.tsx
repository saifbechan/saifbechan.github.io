import {
  faGithub,
  faLinkedin,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import rocketeer from './rocketeer.png';
import './contact.scss';

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
    <div id="contact">
      {links.map(
        (link: LinkType): JSX.Element => (
          <section id={link.name} key={link.name}>
            <a href={link.href} rel="noreferrer" target="_blank">
              {`${link.name}: ${link.handle}`}
              <FontAwesomeIcon icon={link.icon} />
            </a>
          </section>
        )
      )}
      <img alt="Rocketeer" src={rocketeer} />
    </div>
  );
}
