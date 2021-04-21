import { GetStaticProps } from 'next'
import Header from '../components/Header'



type Episode = {
    id: string,
    title: string,
    members: string
}

//Typing the props received by the component Home if a struct of Object that contains a property of episodes that stores a Array of object 
type HomeProps = {

  episodes : Array<Episode>

}

export default function Home(props: HomeProps) {
  console.log(JSON.stringify(props.episodes))
  return ( 
  
    <>
      <h1>test</h1>
    </>

  )
}

//Function with the responsability of generating "static pages" for all Clients that has maked a request in a period of 8 hours

 export const getStaticProps : GetStaticProps = async function(){

  //Request the API that return the data episodes. With async KeyWord the controller of calls get out of the function until the execution has ended
  var responseApi = await fetch("http://localhost:3333/episodes")

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
    
  return {

    props:{

        episodes: data

    },

    revalidate: 60 * 60 * 8

  }
}