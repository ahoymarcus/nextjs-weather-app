import React from 'react';
import Head from 'next/head';
import moment from 'moment-timezone';

// resource
import cities from '../../lib/city.list.json';

// components
import SearchBox from '../../components/SearchBox';
import TodayWeather from '../../components/TodayWeather';
import HourlyWeather from '../../components/HourlyWeather';
import WeeklyWeather from '../../components/WeeklyWeather';



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
			timezone: apiData.timezone,
			currentWeather: apiData.current,
			dailyWeather: apiData.daily,
			hourlyWeather: getHourlyWeather(apiData.hourly, apiData.timezone),
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
const getHourlyWeather = (hourlyData, timezone) => {
	const endOfDay = moment().tz(timezone).endOf('day').valueOf();
	
	const endOfDayTimeStamp = Math.floor(endOfDay / 1000);
	
	const todaysData = hourlyData.filter(data => data.dt < endOfDayTimeStamp);
	
	return todaysData;
};

export default function city({ 
	city, 
	timezone,
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
			
			<div className="page-wrapper">
				<div className="container">
					<SearchBox placeholder="Search for another location..." />
				
					<TodayWeather 
						city={city} 
						weather={dailyWeather[0]} 
						timezone={timezone}
					/>
					
					<HourlyWeather hourlyWeather={hourlyWeather} timezone={timezone} />
					
					<WeeklyWeather weeklyWeather={dailyWeather} timezone={timezone} />
				</div>
			</div>
		</div>
	);
};



