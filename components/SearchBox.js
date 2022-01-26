import React, { useState } from 'react';

// resource
import cities from '../lib/city.list.json';




const SearchBox = () => {
	const [ query, setQuery ] = useState('');
	
	
	const onChange = (e) => {
		const { value } = e.target;
		
		setQuery(value);
	};
	
	
	console.log(query);
	
	
	return (
		<div className="search">
			<input
				type="text"
				value={query}
				onChange={(e) => onChange(e)}
			/>
		</div>
	);
};



export default SearchBox;



