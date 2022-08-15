import { gql, GraphQLClient } from 'graphql-request';
import Link from 'next/link';
import Section from '../components/Section';
import NavBar from '../components/NavBar';



export const getStaticProps = async () => {

  const url = process.env.ENDPOINT;

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      "Authorization": process.env.GRAPH_CMS_TOKEN
    }
  });

  const videosQuery = gql `
    query {
      videos {
        createdAt,
        id,
        title,
        description,
        seen,
        slug,
        tags,
        thumbnail {
          url
        },
        mp4 {
          url
        }
      }
    }
  `

  const accountQuery = gql`
  query {
    account(where: {id: "cl6nen1j515mv0bklvsiocxzz"}){
      username,
      avatar {
        url
      }
    }
  }

  `

  const data = await graphQLClient.request(videosQuery);
  const videos = data.videos
  const accountData = await graphQLClient.request(accountQuery);
  const account = accountData.account

  return {
    props: {
      videos,
      account
    }
  }
}

const Home = ({ videos, account }) => {

  const randomVideo = (videos) => {
    return videos [Math.floor(Math.random() * videos.length)]
  }

  const filterVideos = (videos, genre) => {
    return videos.filter((video) => video.tags.includes(genre))
  }

  const unSeenVideos = (videos) => {
    return videos.filter(video => video.seen == false || video.seen == null)
  }

  console.log('not seen:', videos.filter(video => video.seen == false || video.seen == null))

  return (
    <>
      <NavBar account={account}/>
      <div className="app">
        <div className="main-video">
          <img src={randomVideo(videos).thumbnail.url}
          alt={randomVideo(videos).title} />
        </div>
        <div className="video-feed">
          <Link href="#blink"><div className="franchise" id="blink"></div></Link>
          <Link href="#stray"><div className="franchise" id="stray"></div></Link>
          <Link href="#once"><div className="franchise" id="once"></div></Link>
          <Link href="#itzy"><div className="franchise" id="itzy"></div></Link>
          <Link href="#gidol"><div className="franchise" id="gidol"></div></Link>
        </div>  
          <Section genre={"Recommended for you"} videos={unSeenVideos(videos)} />
          <Section genre={"Queens"} videos={filterVideos(videos, 'Queens')} />
          <Section genre={"kpop"} videos={filterVideos(videos, 'kpop')}/>
          <Section genre={"Solo"} videos={filterVideos(videos, 'Solo')} />
          <Section genre={"GirlBand"} videos={filterVideos(videos, 'GirlBand')} />
          <Section genre={"BoyBand"} videos={filterVideos(videos, 'BoyBand')} />
          <Section id="stray" genre={"Stray"} videos={filterVideos(videos, 'Stray')} />
          <Section id="once" genre={"Once"} videos={filterVideos(videos, 'Once')} />
          <Section id="blink" genre={"Blink"} videos={filterVideos(videos, 'Blink')} />
          <Section id="itzy" genre={"Itzy"} videos={filterVideos(videos, 'Itzy')} />
          <Section id="gidol" genre={"G-idol"} videos={filterVideos(videos, 'G-idol')} />
        
      </div>
    </>
  )
}

export default Home;