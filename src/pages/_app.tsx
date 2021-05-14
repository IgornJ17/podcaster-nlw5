import '../styles/global.scss';
import styles from '../styles/styles.module.scss';
import Header from '../components/Header';
import Player from '../components/Player';
import PlayerContextProvider from '../components/PlayerContextProvider/PlayerContextProvider';

function MyApp({ Component, pageProps }) {
  
  //Change the variable (data / information) of state at listOfEpisode
  return(
    <PlayerContextProvider>
      <div className={styles.Wrapper}>
       <main className={styles.WrapperMain}>
          <Header />
          <Component {...pageProps} />
       </main>
       <Player />
      </div>
    </PlayerContextProvider>
  )
  
}

export default MyApp