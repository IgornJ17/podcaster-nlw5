//import  from '';
import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../../context/PlayerContext';
import Episode from '../../pages/episodes/[slug]';
import styles from './styles.module.scss'
import Image from 'next/image'
import Slider from 'rc-slider'

const Helpers = require('../../helpers/FormatHelpers')


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
        playPreviousPodcast,
        playNextPodcast,
        hasNext,
        hasPrevious,
        isLooping,
        isShuffling,
        setShufflePodcast,
        switchPlay,
        setLoopPodcast,
        changeStatePlaying 
    } = usePlayer();

    const [ audioProgress, setAudioProgress ] = useState(0);

    const episodes = listOfEpisode[currentEpisodeIndex]


    useEffect(() => {
       if(audioRef.current == null){
           return;
       }
       if(isPlaying){
           audioRef.current.play();
       }else{
           audioRef.current.pause();
       }
        
    }, [isPlaying]);


    function setAudioListener(){
        audioRef.current.currentTime = 0

        audioRef.current.addEventListener('timeupdate', () => {
            setAudioProgress(Math.floor(audioRef.current.currentTime))
        })
    }

    function handleAudio(amount: number){
        audioRef.current.currentTime = amount;
        setAudioProgress(amount)
    }

    function changeEpisode(){
        
    }


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

                    <span className={styles.SpanDuraction}>{Helpers.formatDuration(audioProgress)}</span>

                        <div className={styles.Slider}>
                            
                            { validListEpisodeContent(episodes) ? (
                                    <Slider
                                        max={Number(episodes.duration)}
                                        value={audioProgress}
                                        onChange={handleAudio}
                                        trackStyle={{ backgroundColor: '#0c8029' }}
                                        railStyle={{ backgroundColor: 'white' }}/>
                                ) : 
                                (
                                    <div className={styles.EmptySlider}/>
                                ) 
                            }
                            
                            
                        </div>

                    <span className={styles.SpanDuraction}>{ Helpers.formatDuration(episodes?.duration ?? 0)}</span>

                </div>

                { (episodes != null || episodes != undefined) ?  (
                        <audio 
                            src={episodes.url}
                            ref={audioRef}
                            autoPlay
                            loop={isLooping}
                            onLoadedMetadata={setAudioListener}
                            onEnded={changeEpisode}
                            onPlay={() => changeStatePlaying(true)}
                            onPause={() => changeStatePlaying(false)}
                        />
                    ) : null
                }

                <div className={styles.Buttons}>

                    <button type="button"
                        className={styles.PlayerButton} 
                        disabled={ disableButton(episodes) || listOfEpisode.length == 1}
                        onClick={setShufflePodcast}
                    >

                        <img src="/shuffle.svg" alt="Random" className={isShuffling ? styles.ImageButtonActive : ''} />

                    </button>

                    <button type="button" className={styles.PlayerButton} disabled={ disableButton(episodes) || hasPrevious(currentEpisodeIndex) } onClick={playPreviousPodcast}>

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

                    <button type="button" className={styles.PlayerButton} disabled={ disableButton(episodes) || hasNext(currentEpisodeIndex) } onClick={playNextPodcast}>

                        <img src="/play-next.svg" alt="Play Next" className={styles.ImageButton}/>

                    </button>

                    <button type="button" 
                        className={styles.PlayerButton}
                        disabled={ disableButton(episodes) }
                        onClick={setLoopPodcast}
                    >

                        <img src="/repeat.svg" alt="Repeat" className={ isLooping ? styles.ImageButtonActive : ''}/>

                    </button>

                </div>

            </footer>

        </div>
    )
}

export default Player;