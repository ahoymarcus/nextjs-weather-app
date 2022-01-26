// Weather API
// https://openweathermap.org/
// https://www.youtube.com/watch?v=6UlpfXQWysg&t=1905s
// 1 hrs  14' 50''
import Head from 'next/head';

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



