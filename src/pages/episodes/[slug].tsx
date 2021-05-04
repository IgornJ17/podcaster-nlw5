import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import styles from './episode.module.scss'
import Image from 'next/image'
import Link from 'next/link';

const HelperMethods = require('../../helpers/FormatHelpers.ts')
const baseUrlEpisodes = "http://localhost:3333/episodes/"
const baseUrl = "http://localhost:3333/"


type Episode = {
    id: string,
    title: string,
    thumbnail: string,
    members: string,
    publishedAt: string,
    duration: Number,
    durationAsString: string,
    description: string,
    url: string,
  }

type EpisodeProps = {
    episode: Episode
}

export default function Episode( {episode} : EpisodeProps ){

    return (
       <div className={styles.Episode}>
           <div className={styles.EpisodeThumbnail}>
               <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" 
                            alt="Back PodCast"/>
                    </button>
               </Link>
               <Image 
                    width={700}
                    height={160}
                    objectFit="cover"
                    src={episode.thumbnail}
               />
               <button type="button">
                   <img src="/play.svg" alt="Play PodCast"/>
               </button>
           </div>

           <header>
               <h1>{episode.title}</h1>
               <span>{episode.members}</span>
               <span>{episode.publishedAt}</span>
               <span>{episode.durationAsString}</span>
           </header>

           <div
                className={styles.EpisodeDescription} 
                dangerouslySetInnerHTML={ {__html: episode.description} }
            />
       </div>
    )

}   

export const getStaticPaths : GetStaticPaths = async function(){
    
    const params = {
        "_limit" : 2,
        "_sort" : "published_at",
        "_order" : "desc"
      }

    const responseApi = await fetch(`${baseUrl}episodes?`
    + `_limit=${params["_limit"]}&`
    + `_sort=${params["_sort"]}&` 
    + `_order=${params["_order"]}`)

    const data = await responseApi.json()

    const paths = data.map((ep) => {
        return {
            params: {
                slug: ep.id
            }
        }
    }) 
    
    
    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps : GetStaticProps = async function(reqParam) {
    
    const episodeURL = reqParam.params

    const responseAPI = await fetch(`${baseUrlEpisodes}${episodeURL.slug}`)
    
    if(responseAPI.ok){
        var data = await responseAPI.json()
    }
    else if(responseAPI.status >= 400){
        console.error("Erro na requisicao")
    }

    const episode = {
          id: data.id,
          title: data.title,
          thumbnail: data.thumbnail,
          members: data.members,
          publishedAt: HelperMethods.formatDateEpisodes(data.published_at),
          duration: Number(data.file.duration),
          durationAsString: HelperMethods.formatDuration(Number(data.file.duration)),
          description: data.description,
          url: data.file.url
        }

    
    return {

        props: {
            episode: episode
        },

        revalidate: 60 * 60 * 24
    }
}