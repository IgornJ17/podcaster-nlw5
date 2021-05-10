//import  from '';
import { useContext, useEffect, useRef } from 'react';
import PlayerContext from '../../context/PlayerContext';
import Episode from '../../pages/episodes/[slug]';
import styles from './styles.module.scss'
import Image from 'next/image'
import Slider from 'rc-slider'


import 'rc-slider/assets/index.css'

function validListEpisodeContent(aEpisodes){
    var result = aEpisodes != null && aEpisodes != undefined

    return result
}

function disableButton(aEpisodes){
    
    var result = validListEpisodeContent(aEpisodes) ? false : true 
    
    return result
}

function Player(){

    const audioRef = useRef<HTMLAudioElement>(null);
    const { 
        listOfEpisode, 
        currentEpisodeIndex, 
        isPlaying, 
        switchPlay,
        changeStatePlaying 
    } = useContext(PlayerContext);
    var episodes = listOfEpisode[currentEpisodeIndex]


    useEffect(() => {
       if(audioRef.current == null){
           return;
       }
       console.log(audioRef.current)
       if(isPlaying){
           audioRef.current.play();
       }else{
           audioRef.current.pause();
       }
        
    }, [isPlaying]);


    return (
        <div className={styles.PlayerConteiner}>

            <header className={styles.PlayerHeader}>

                <img src="playing.svg" alt="Tocando..."/><strong className={styles.PlayerStrong}>{ validListEpisodeContent(episodes) ? ` Playing ${episodes.title}` : "Not playing..." }</strong>

            </header>

            { validListEpisodeContent(episodes) ? 
                (   
                
                    <div className={styles.CurrentEpisodes}>
                        <div>

                            <Image 
                                width={592} 
                                height={592} 
                                src={episodes.thumbnail} 
                                objectFit="cover"  
                            />

                        </div>

                        <div>
                            <strong>{episodes.title}</strong>
                            <span>{episodes.members}</span>
                        </div>
                    </div> 
                    
                ) : 
                (     
                    <div className={styles.EmptyPlayer}>
                
                    <strong className={styles.PlayerStrong}>Select a podcast to listen</strong>
    
                    </div>
                ) }

            <footer className={styles.Empty} id={styles.PlayerFooter}>

                <div className={styles.Progress}>

                    <span className={styles.SpanDuraction}>00:00</span>

                        <div className={styles.Slider}>
                            
                            { validListEpisodeContent(episodes) ? (
                                    <Slider 
                                        trackStyle={{ backgroundColor: '#0c8029' }}
                                        railStyle={{ backgroundColor: 'white' }}/>
                                ) : 
                                (
                                    <div className={styles.EmptySlider}/>
                                ) 
                            }
                            
                            
                        </div>

                    <span className={styles.SpanDuraction}>00:00</span>

                </div>

                { (episodes != null || episodes != undefined) ?  (
                        <audio 
                            src={episodes.url}
                            ref={audioRef}
                            autoPlay
                            onPlay={() => changeStatePlaying(true)}
                            onPause={() => changeStatePlaying(false)}
                        />
                    ) : null
                }

                <div className={styles.Buttons}>

                    <button type="button" className={styles.PlayerButton} disabled={ disableButton(episodes) }>

                        <img src="/shuffle.svg" alt="Random" className={styles.ImageButton} />

                    </button>

                    <button type="button" className={styles.PlayerButton} disabled={ disableButton(episodes) }>

                        <img src="/play-previous.svg" alt="Play Previous" className={styles.ImageButton}/>

                    </button>

                    <button type="button" className={styles.PlayButton} 
                        disabled={ disableButton(episodes) } 
                        onClick={ switchPlay }>
                        {isPlaying ? 
                            (<img 
                                src="/pause.svg" 
                                alt="Pause" 
                                className={styles.ImageButtonPlay}
                            />) 
                            : 
                            (<img 
                                src="/play.svg" 
                                alt="Play" 
                                className={styles.ImageButtonPlay}
                            />)
                        }
                    </button>

                    <button type="button" className={styles.PlayerButton} disabled={ disableButton(episodes) }>

                        <img src="/play-next.svg" alt="Play Next" className={styles.ImageButton}/>

                    </button>

                    <button type="button" className={styles.PlayerButton} disabled={ disableButton(episodes) }>

                        <img src="/repeat.svg" alt="Repeat" className={styles.ImageButton}/>

                    </button>

                </div>

            </footer>

        </div>
    )
}

export default Player;