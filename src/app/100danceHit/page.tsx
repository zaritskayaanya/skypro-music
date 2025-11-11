import Bar from '../../components/Bar/Bar';
import CenterBlock from '../../components/CenterBlock/CenterBlock';
import Nav from '../../components/Nav/Nav';
import SideBar from '../../components/SideBar/SideBar';
import styles from '../page.module.css';

export default function DanceHit() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <CenterBlock />
          <SideBar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
