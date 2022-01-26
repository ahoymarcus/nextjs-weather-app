import React from 'react';
import Head from 'next/head';

// resource
import cities from '../../lib/city.list.json';



/*
	getServerSideProps(): because we are using live data and that changes a lot...
*/
export async function getServerSideProps(context) {
	const city = getCity(context.params.city);
	
	console.log(city);
	
	// using Next-JS 404
	if (!city) {
		return {
			notFound: true,
		};
	}
	

	const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=metric&exclude=minutely`);
	const apiData = await response.json();
	
	if (!apiData) {
		return {
			notFound: true
		};
	}
	
	console.log(apiData);
	
	
	const slug = context.params.city;
	
	
	return {
		props: {
			city,
			currentWeather: apiData.current,
			dailyWeather: apiData.daily,
			hourlyWeather: getHourlyWeather(apiData.hourly),
		}
	};
};


// server side - aux function
const getCity = param => {
	const cityParam = param.trim();
	
	// get the id of the city
	const splitCity = cityParam.split('-');
	const id = splitCity[splitCity.length - 1];
	
	console.log(id, splitCity);
	
	if (!id) {
		return null;
	}
	
	const city = cities.find(city => city.id.toString() === id);
	
	if (city) {
		return city;
	} else {
		 return null;
	}
};

// aux funtion
const getHourlyWeather = (hourlyData) => {
	// current time
	const current = new Date();
	
	// get round hour
	current.setHours(current.getHours(), 0, 0, 0);
	
	const tomorow = new Date(current);
	tomorow.setDate(tomorow.getDate() + 1);
	
	// set hour to midnight
	tomorow.setHours(0, 0, 0, 0);
	
	// divide by 1000 to get timestamps in seconds
	const currentTimeStamp = Math.floor(current.getTime() / 1000);
	const tomoroTimeStamp = Math.floor(tomorow.getTime() / 1000);
	
	const todayData = hourlyData.filter(data => data.dt < tomoroTimeStamp);
	
	return todayData;
};

export default function city({ 
	city, 
	currentWeather, 
	dailyWeather, 
	hourlyWeather 
}) {
	console.log(hourlyWeather);
	
	
	return (
		<div>
			<Head>
				<title>{city.name} Weather - Next-JS App</title>
			</Head>
			<h1>City Page</h1>
			<h2></h2>
		</div>
	);
};



