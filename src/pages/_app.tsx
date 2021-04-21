import '../styles/global.scss';
import styles from '../styles/styles.module.scss';
import Header from '../components/Header';
import Player from '../components/Player';

function MyApp({ Component, pageProps }) {
  return (
      <div className={styles.Wrapper}>
       <main className={styles.WrapperMain}>
          <Header />
          <Component {...pageProps} />
       </main>
       <Player />

      </div>

  )
}

export default MyApp