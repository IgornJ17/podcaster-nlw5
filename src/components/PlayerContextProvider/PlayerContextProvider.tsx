import { useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";

type Episode = {
    id: string,
    title: string,
    thumbnail: string,
    members: string,
    publishedAt: string,
    duration: Number,
    durationAsString: string,
    url: string
  }




export default function PlayerContextProvider(props){
  const [ listOfEpisode, setlistOfEpisode ] = useState([]);
  const [ currentEpisodeIndex, setCurrentEpisodeIndex ] = useState(0);
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ isLooping, setIsLooping] = useState(false)
  const [ isShuffling, setIsShuffling] = useState(false)

  const hasNext = function(indexOfNextEpisode){
    return indexOfNextEpisode >= listOfEpisode.length
  }
  const hasPrevious = function(indexOfPreviousEpisode){
    return indexOfPreviousEpisode <= 0
  }

  function startPlay(episode : Episode){
    setlistOfEpisode([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true)
  }

  function playEpisodeById (episodes: Episode[], index: number){
    setlistOfEpisode(episodes);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function switchPlay(){
    setIsPlaying(!isPlaying)
  }
  
  function setLoopPodcast(){
    setIsLooping(!isLooping)
  }

  function setShufflePodcast(){
    setIsShuffling(!isShuffling)
  }

  function changeStatePlaying(state: boolean){
    setIsPlaying(state)
  }

  function playNextPodcast(){

    if(isShuffling){
      const nextEpisodeShuffled = Math.round(Math.random() * listOfEpisode.length)
      setCurrentEpisodeIndex(nextEpisodeShuffled);

    }else if(!hasNext(indexOfNextEpisode)){
        var indexOfNextEpisode = currentEpisodeIndex + 1
        setCurrentEpisodeIndex(indexOfNextEpisode) 
    }else{
        console.error("ERROR: Episode requested out of bound");
    }
    

  }

  function playPreviousPodcast(){
    var indexOfPreviousEpisode = currentEpisodeIndex;
    if(!hasPrevious(indexOfPreviousEpisode)){
      indexOfPreviousEpisode--;
      setCurrentEpisodeIndex(indexOfPreviousEpisode)
    } else {
      console.error("ERROR: Episode requested out of bound");
    }
     
     
  }

  return (
    <PlayerContext.Provider 
        value={
            { 
                listOfEpisode, 
                currentEpisodeIndex, 
                startPlay, 
                playEpisodeById,
                playNextPodcast,
                playPreviousPodcast,
                hasNext,
                hasPrevious,
                isPlaying,
                isLooping,
                setLoopPodcast,
                isShuffling,
                setShufflePodcast,
                switchPlay, 
                changeStatePlaying 
            }
        }
    >

        {props.children}

    </PlayerContext.Provider>
  )
}