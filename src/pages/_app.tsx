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
  const [ isPlaying, setIsPlaying ] = useState(false)

  function startPlay(episode){
    setlistOfEpisode([episode])
    setCurrentEpisodeIndex(0);
    setIsPlaying(true)
  }

  function switchPlay(){
    console.log(isPlaying)
    setIsPlaying(!isPlaying)
  }
  
  function changeStatePlaying(state: boolean){
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider value={{ listOfEpisode, currentEpisodeIndex, startPlay, isPlaying, switchPlay, changeStatePlaying }}>
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