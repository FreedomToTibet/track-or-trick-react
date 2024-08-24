import {createContext, useReducer, useEffect, useContext} from 'react';

const BASE_URL = 'http://localhost:3000';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {...state, isLoading: true};
    case 'citiesLoaded':
      return {...state, cities: action.payload, isLoading: false};
    case 'cityLoaded':
      return {...state, currentCity: action.payload, isLoading: false};
    case 'cityCreated':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };
    case 'cityDeleted':
      return {...state, cities: action.payload, isLoading: false, currentCity: {}};
    case 'rejected':
      return {...state, isLoading: false};
    default:
      return state;
  }
};

const CitiesProvider = ({children}) => {
  const [{cities, isLoading, currentCity}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({type: 'loading'});
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({type: 'citiesLoaded', payload: data});
      } catch {
        dispatch({type: 'rejected', payload: 'fetch cities error:'});
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id) => {
		if (Number(id) == currentCity.id) return;

    dispatch({type: 'loading'});

    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({type: 'cityLoaded', payload: data});
    } catch {
      dispatch({type: 'rejected', payload: 'fetch city error:'});
    }
  };

  const createCity = async (newCity) => {
    dispatch({type: 'loading'});
    try {
      const response = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      dispatch({type: 'cityCreated', payload: data});
    } catch {
      dispatch({type: 'rejected', payload: 'create city error:'});
    }
  };

  const deleteCity = async (id) => {
    dispatch({type: 'loading'});
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });

      const afterDeleteCity = cities.filter((city) => city.id !== id);
      dispatch({type: 'cityDeleted', payload: afterDeleteCity});
    } catch {
      dispatch({type: 'rejected', payload: 'delete city error:'});
    }
  };

  return (
    <CitiesContext.Provider
      value={{cities, isLoading, currentCity, getCity, createCity, deleteCity}}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error('useCities must be used within a CitiesProvider');
  }
  return context;
};

export {CitiesProvider, useCities};
