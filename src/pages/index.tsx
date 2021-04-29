import next, { GetStaticProps } from 'next'
import styles from './home.module.scss'
import Image from 'next/image'
import Link from 'next/link';
import { allowedStatusCodes } from 'next/dist/lib/load-custom-routes'


const HelperMethods = require('../helpers/FormatHelpers.ts')
const baseUrl = "http://localhost:3333/"

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

//Define the parameters of the request to API
const params = {
  "_limit" : 8,
  "_sort" : "published_at",
  "_order" : "desc"
}

//Typing the props received by the component Home if a struct of Object that contains a property of episodes that stores a Array of object 
type HomeProps = {
  
  latestEpisodes: Array<Episode>,
  restOfEpisodes: Array<Episode>

}

export default function Home({latestEpisodes, restOfEpisodes}: HomeProps) {
  
  return ( 
  
    <div className={styles.HomePodcasts}>

      <section className={styles.LatestPodcast}>

          <h2 className={styles.TitleLatestPodcast}>{"All we have brand".toUpperCase()}</h2>

          <ul className={styles.LatestPodcastList}>
            {latestEpisodes.map((ep) =>{
              return (
                <li key={ep.id}>
                    <Image 
                      width={192} 
                      height={192} 
                      src={ep.thumbnail} 
                      alt={ep.title}
                      objectFit="cover"  
                    />

                    <div className={styles.EpisodesDetails}>
                      <Link href={`/episodes/${ep.id}`}>
                      
                        <a>{ep.title}</a>
                      
                      </Link>
                        <p>{ep.members}</p>
                        <span>{ep.publishedAt}</span>
                        <span>{ep.durationAsString}</span>
                    </div>

                    <button>
                      <img src="/play-green.svg" alt="Play"/>
                    </button>

                </li>              
              )
            })}   
          </ul>

      </section>


      <section className={styles.PodcastList}>

          <h2>{"All Episodes".toUpperCase()}</h2>
          
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th></th>
                <th>PodCast</th>
                <th>Casting</th>
                <th>Date</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {restOfEpisodes.map(ep => {
                return(
                  <tr key={ep.id}>
                    <td style={{ width: 72 }}>
                      <Image 
                        width={120} 
                        height={120} 
                        src={ep.thumbnail} 
                        alt={ep.title}
                        objectFit="cover"  
                      />
                    </td>
                    <td>
                      <Link href={`/episodes/${ep.id}`}>

                        <a>{ep.title}</a>
                      
                      </Link>
                    </td>
                    <td>{ep.members}</td>
                    <td style={{ width: 100 }}>{ep.publishedAt}</td>
                    <td>{ep.durationAsString}</td>
                    <td>
                      <button type="button">
                        <img src="/play-green.svg" alt="Play"/>
                      </button>
                    </td>
                  </tr>
      
                )
              })}
            </tbody>
          </table>

      </section>

    </div>

  )
}

//Function with the responsability of generating "static pages" for all Clients that has maked a request in a period of 8 hours

 export const getStaticProps : GetStaticProps = async function(){

  //Request the API that return the data episodes. With async KeyWord the controller of calls get out of the function until the execution has ended
  //The query params in the request url set the format of return json data. Order by published_at property whith a limit of 8 rows or 8 Object of Type Episode, defined by Typing Episode.
  var responseApi = await fetch(`${baseUrl}episodes?`
    + `_limit=${params["_limit"]}&`
    + `_sort=${params["_sort"]}&` 
    + `_order=${params["_order"]}`)

  // Check the status code of the response of API
  if (responseApi.ok) {
    console.log('\n Request answered with success...\n')

    //Convert the response data in json format and return a Promise. The function continues the steps after ending the execution of the promise
    var data = await responseApi.json();

  }else if(responseApi.status > 400){

    //Print the responded error returned by API in the console
    console.error("The API not responded as expected. Try again Later")
    return;

  }

  //Format the data returned by body of response in a request to API
  const episodes = data.map(function(ep){
    return {
      id: ep.id,
      title: ep.title,
      thumbnail: ep.thumbnail,
      members: ep.members,
      publishedAt: HelperMethods.formatDateEpisodes(ep.published_at),
      duration: Number(ep.file.duration),
      durationAsString: HelperMethods.formatDuration(Number(ep.file.duration)),
      url: ep.file.url
      
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const restOfEpisodes = episodes.slice(2, episodes.length)
    
  return {

    props:{

        latestEpisodes: latestEpisodes,
        restOfEpisodes: restOfEpisodes

    },

    revalidate: 60 * 60 * 8

  }
}