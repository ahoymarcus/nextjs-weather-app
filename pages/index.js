// Weather API
// https://openweathermap.org/
// https://www.youtube.com/watch?v=6UlpfXQWysg&t=1905s
// 1 hrs  48' 00''
import Head from 'next/head';

// components
import SearchBox from '../components/SearchBox';
import FamousPlaces from '../components/FamousPlaces';




export default function Home() {
  return (
    <>
			<Head>
				<title>Weather App - Next-JS</title>
			</Head>
			
			<div className="home">
				<div className="container">
					<SearchBox placeholder="Search for a city..." />
					<FamousPlaces />
				</div>
			</div>
			
		</>
  )
}



