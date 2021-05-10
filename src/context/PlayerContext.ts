import { createContext as Context } from 'react'


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
    startPlay: (sEpisode) => void;
    changeStatePlaying: (bState: boolean) => void;
    switchPlay: () => void;
}



const PlayerContext = Context({} as PlayerStruct);

export default PlayerContext;