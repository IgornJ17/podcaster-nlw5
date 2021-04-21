//import  from '';
import styles from './styles.module.scss'

function Player(){
    return (
        <div className={styles.PlayerConteiner}>

            <header className={styles.PlayerHeader}>

                <img src="playing.svg" alt="Tocando..."/><strong className={styles.PlayerStrong}>Playing...</strong>

            </header>

            <div className={styles.EmptyPlayer}>

                <strong className={styles.PlayerStrong}>Select a podcast to listen</strong>

            </div>

            <footer className={styles.Empty} id={styles.PlayerFooter}>

                <div className={styles.Progress}>

                    <span className={styles.SpanDuraction}>00:00</span>

                        <div className={styles.Slider}>

                            <div className={styles.EmptySlider}/>
                            
                        </div>

                    <span className={styles.SpanDuraction}>00:00</span>

                </div>

                <div className={styles.Buttons}>

                    <button type="button" className={styles.PlayerButton}>

                        <img src="/shuffle.svg" alt="Random" className={styles.ImageButton} />

                    </button>

                    <button type="button" className={styles.PlayerButton}>

                        <img src="/play-previous.svg" alt="Play Previous" className={styles.ImageButton}/>

                    </button>

                    <button type="button" className={styles.PlayButton}>

                        <img src="/play.svg" alt="Play" className={styles.ImageButtonPlay}/>

                    </button>

                    <button type="button" className={styles.PlayerButton}>

                        <img src="/play-next.svg" alt="Play Next" className={styles.ImageButton}/>

                    </button>

                    <button type="button" className={styles.PlayerButton}>

                        <img src="/repeat.svg" alt="Repeat" className={styles.ImageButton}/>

                    </button>

                </div>

            </footer>

        </div>
    )
}

export default Player;