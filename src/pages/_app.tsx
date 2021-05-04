import '../styles/global.scss';
import styles from '../styles/styles.module.scss';
import Header from '../components/Header';
import Player from '../components/Player';
import PlayerContext from '../context/PlayerContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  
  //Change the variable (data / information) of state at listOfEpisode
  const [ listOfEpisode, setlistOfEpisode ] = useState([]);
  const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0);

  function startPlay(episode){
    setlistOfEpisode([episode])
    setCurrentEpisodeIndex(0);
  }

  return (
    <PlayerContext.Provider value={{ listOfEpisode, currentEpisodeIndex, startPlay }}>
      <div className={styles.Wrapper}>
       <main className={styles.WrapperMain}>
          <Header />
          <Component {...pageProps} />
       </main>
       <Player />
      </div>
    </PlayerContext.Provider>

  )
}

export default MyApp