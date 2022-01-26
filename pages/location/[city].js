import React from 'react';

// resource
import cities from '../../lib/city.list.json';



/*
	getServerSideProps(): because we are using live data and that changes a lot...
*/
export async function getServerSideProps(context) {
	const city = getCity(context.params.city);
	const slug = context.params.city;
	
	console.log(city);
	
	// using Next-JS 404
	if (!city) {
		return {
			notFound: true,
		};
	}
	
	return {
		props: {
			slug
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


export default function city({ slug }) {
	
	
	return (
		<div>
			<h1>City Page</h1>
			<h2>{slug}</h2>
		</div>
	);
};



