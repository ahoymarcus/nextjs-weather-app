import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';

// resource
import cities from '../lib/city.list.json';




const SearchBox = ({ placeholder }) => {
	const [ query, setQuery ] = useState('');
	const [ results, setResults ] = useState([]);
	
	
	React.useEffect(() => {
		const clearQuery = () => setQuery('');
		
		/*
			O objeto Router do Next-JS escutará por mudanças de páginas, para chamar a limpeza do elemento input.....
		*/
		Router.events.on('routeChangeComplete', clearQuery);
		
		// Limpar, quando Unmount
		return () => {
			Router.events.off('routeChangeComplete', clearQuery);
		};
	}, []);
	
	
	const onChange = (e) => {
		const { value } = e.target;
		
		setQuery(value);
		
		let matchingCities = [];
		
		if (value.length > 3) {
			for (let city of cities) {
				if (matchingCities.length >= 5) {
					break;
				}
				
				const match = city.name.toLowerCase().startsWith(value.toLowerCase());
				
				if (match) {
					const cityData = {
						...city,
						slug: `${city.name.toLowerCase().replace(/ /g, '-')}-${city.id}`
					};
					matchingCities.push(cityData);
				}
			}
		}
		
		console.log(matchingCities);
		
		return setResults(matchingCities);
	};
	
	console.log(results);
	
	
	return (
		<div className="search">
			<input
				type="text"
				value={query}
				onChange={(e) => onChange(e)}
				placeholder={placeholder ? placeholder : ''}
			/>
			
			{query.length > 3 && (
				<ul>
				{results.length > 0 ? (
						results.map((city) => (
							<li key={city.slug}>
								<Link 
									href={`/location/${city.slug}`} 
								>
									<a>
										{city.name}
										{city.state ? `, ${city.state}` : ''}{' '}
										<span>({city.country})</span>
									</a>
								</Link>
							</li>
						))
					) : (
						<li className="search__no-results">
							no result
						</li>
					)}
				</ul>
			)}
		</div>
	);
};



export default SearchBox;



