import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Product from './pages/Product/Product';
import Home from './pages/Home/Home';
import Pricing from './pages/Pricing';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './pages/AppLayout/AppLayout';
import Login from './pages/Login/Login';

import CityList from './components/CityList/CityList';

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
          <Route index element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="countries" element={<div>Countries</div>} />
          <Route path="form" element={<div>Form</div>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};
export default App;
