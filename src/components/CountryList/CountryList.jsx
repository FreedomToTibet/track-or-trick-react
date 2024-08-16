import CountryItem from "../CountryItem/CountryItem";

import Message from "../../ui/Message/Message";
import Spinner from "../../ui/Spinner/Spinner";
// import { useCities } from "../contexts/CitiesContext";

import styles from "./CountryList.module.css";

const CountryList = ({cities, isLoading}) => {
  // const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // const countries = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country))
  //     return [...arr, { country: city.country, emoji: city.emoji }];
  //   else return arr;
  // }, []);

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