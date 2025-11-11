'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './nav.module.css';
import { useState } from 'react';

export default function Nav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className={styles.main__nav}>
      <Link href="/">
        <div className={styles.nav__logo}>
          <Image
            width={250}
            height={170}
            className={styles.logo__image}
            src="/img/logo.png"
            alt={'logo'}
          />
        </div>
      </Link>
      <div onClick={toggleModal} className={styles.nav__burger}>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isModalOpen ? (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/" className={styles.menu__link}>
                Главное
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/myTracks" className={styles.menu__link}>
                Мои треки
              </Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="../signin.html" className={styles.menu__link}>
                Выйти
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
