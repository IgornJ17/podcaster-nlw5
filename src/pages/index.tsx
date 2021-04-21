import { GetStaticProps } from 'next'
import Header from '../components/Header'

export default function Home(props) {
  console.log(props.episodes)
  return ( 
    
    <>
      <h1>test</h1>

      
    </>
  )
}

export async function getStaticProps(){

  var requestApi = await fetch("http://localhost:3333/episodes")
  var data = await requestApi.json();

  return {

    props:{

        episodes: data

    },

    revalidate: 60 * 60 * 8

  }
}