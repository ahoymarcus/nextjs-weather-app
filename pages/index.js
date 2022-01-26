// NEWS API
// https://newsapi.org/
// https://www.youtube.com/watch?v=xtItzwYG6oQ
// 0 hrs 17' 50''
import Head from 'next/head';

// styles


// components
import SearchBox from '../components/SearchBox';




export default function Home() {
  return (
    <>
			<Head>
				<title>Weather App - Next-JS</title>
			</Head>
			
			<div className="home">
				<div className="container">
					<SearchBox />
					{/* */}
				</div>
			</div>
			
		</>
  )
}



