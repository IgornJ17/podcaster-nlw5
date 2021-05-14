import { createContext as Context, useContext } from 'react'


type EpisodeStruct = {
    title: string;
    members: string;
    thumbnail: string;
    duration: Number;
    url: string;
}

type PlayerStruct = {
    listOfEpisode: Array<EpisodeStruct>;
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffling: boolean;
    startPlay: (sEpisode) => void;
    playEpisodeById: (episodes, index) => void;
    playPreviousPodcast: () => void;
    playNextPodcast: () => void;
    hasPrevious: (index) => boolean; 
    hasNext: (index) => boolean;
    changeStatePlaying: (bState: boolean) => void;
    switchPlay: () => void;
    setLoopPodcast: () => void;
    setShufflePodcast: () => void;
}



export const PlayerContext = Context({} as PlayerStruct);

export const usePlayer = function() {
       return useContext(PlayerContext);
}