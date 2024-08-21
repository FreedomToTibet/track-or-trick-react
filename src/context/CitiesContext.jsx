import { createContext, useState, useEffect, useContext } from 'react';

const BASE_URL = 'http://localhost:3000';

const CitiesContext = createContext();

const CitiesProvider = ({children}) => {
	const [cities, setCities] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentCity, setCurrentCity] = useState({});

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

	const getCity = async (id) => {
		try {
			setIsLoading(true);
			const response = await fetch(`${BASE_URL}/cities/${id}`);
			const data = await response.json();
			setCurrentCity(data);
		}
		catch (error) {
			console.error('getCity error:', error);
		}
		finally {
			setIsLoading(false);
		}
	};

	const createCity = async (newCity) => {
		try {
			setIsLoading(true);
			const response = await fetch(`${BASE_URL}/cities/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newCity),
			});
			const data = await response.json();
			setCities([...cities, data]);
		}
		catch (error) {
			console.error('createCity error:', error);
		}
		finally {
			setIsLoading(false);
		};
	};

	const deleteCity = async (id) => {
		try {
			setIsLoading(true);
			await fetch(`${BASE_URL}/cities/${id}`, {
				method: 'DELETE',
			});
			
			setCities(cities.filter(city => city.id !== id));
		}
		catch (error) {
			console.error('createCity error:', error);
		}
		finally {
			setIsLoading(false);
		};
	};

	return (
		<CitiesContext.Provider value={{cities, isLoading, currentCity, getCity, createCity, deleteCity}}>
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