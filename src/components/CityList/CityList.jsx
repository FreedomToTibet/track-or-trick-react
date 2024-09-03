import { compareAsc } from "date-fns";
import { useCities } from "../../context/CitiesContext";

import CityItem from "../CityItem/CityItem";

import Spinner from "../../ui/Spinner/Spinner";
import Message from "../../ui/Message/Message";

import styles from "./CityList.module.css";

const CityList = () => {
	
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

		const sortedCities = cities.sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)));

  return (
    <ul className={styles.cityList}>
		  {sortedCities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
