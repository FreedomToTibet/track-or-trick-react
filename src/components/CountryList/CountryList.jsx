import CountryItem from "../CountryItem/CountryItem";

import Message from "../../ui/Message/Message";
import Spinner from "../../ui/Spinner/Spinner";
import { useCities } from "../context/CitiesContext";

import styles from "./CountryList.module.css";

const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

	const countries = Array.from(
		new Set(cities.map(city => city.country))
	).map(country => {
		const { emoji } = cities.find(city => city.country === country);
		return { country, emoji };
	});

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;