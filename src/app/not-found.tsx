import Link from 'next/link';
import Nav from '../components/Nav/Nav';
import Bar from '../components/Bar/Bar';
import styles from './not-found.module.css';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
        </main>
        <div className={styles.title_wrapper}>
          <h1 className={styles.title}>404</h1>
          <div className={styles.text_wrapper}>
            <h2 className={styles.text}>Страница не найдена</h2>
            <Image
              width={52}
              height={52}
              className={styles.smile__image}
              src="/img/smile.png"
              alt={'smile'}
            />
          </div>
          <p className={styles.desc}>
            Возможно, она была удалена <br /> или перенесена на другой адрес
          </p>
          <Link className={styles.button} href="/music/main">
            Вернуться на главную
          </Link>
        </div>
        <Bar />
      </div>
    </div>
  );
}