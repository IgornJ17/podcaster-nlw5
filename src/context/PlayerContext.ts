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
    startPlay: (sEpisode) => void;
}

const PlayerContext = Context({} as PlayerStruct);

export default PlayerContext;