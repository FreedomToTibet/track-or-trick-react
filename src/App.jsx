import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import Product from './pages/Product/Product';
import Home from './pages/Home/Home';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout/AppLayout';
import Login from './pages/Login/Login';

import CityList from './components/CityList/CityList';
import CountryList from './components/CountryList/CountryList';
import City from './components/City/City';
import Form from './components/Form/Form';

const BASE_URL = 'http://localhost:3000';

const App = () => {
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
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Navigate replace to="cities" />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
					<Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<Form />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};
export default App;
