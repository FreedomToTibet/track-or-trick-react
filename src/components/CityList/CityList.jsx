// import Message from "./Message";
// import { useCities } from "../contexts/CitiesContext";

import CityItem from "../CityItem/CityItem";

import Spinner from "../../ui/Spinner/Spinner";
import Message from "../../ui/Message/Message";

import styles from "./CityList.module.css";

const CityList = ({cities, isLoading}) => {
	
  // const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
		  {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
