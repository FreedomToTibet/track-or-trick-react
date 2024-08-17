import { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = 'http://localhost:3000';

const CitiesContext = createContext();

const CitiesProvider = ({children}) => {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(true);  

  useEffect(() => {
		const fetchCities = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(`${BASE_URL}/cities`);
				const data = await response.json();
				setCities(data);
			}
			catch (error) {
				console.error('fetchCities error:', error);
			}
			finally {
				setIsLoading(false);
			}
		};
		fetchCities();
	}, []);

	return (
		<CitiesContext.Provider value={{cities, isLoading}}>
			{children}
		</CitiesContext.Provider>
	);
}

const useCities = () => {
	const context = useContext(CitiesContext);
	if (!context) {
		throw new Error('useCities must be used within a CitiesProvider');
	}
	return context;
}


export {CitiesProvider, useCities};