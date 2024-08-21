// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DatePicker from "react-datepicker";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { useCities } from "../../context/CitiesContext";

import Button from "../../ui/Button/Button";
import BackButton from "../../ui/Button/BackButton";
import Spinner from "../../ui/Spinner/Spinner";
import Message from "../../ui/Message/Message";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
	const [lat, lng] = useUrlPosition();
	const { createCity, isLoading } = useCities();
	const navigate = useNavigate();

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
	const [emoji, setEmoji] = useState("");

	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

	useEffect(() => {
		const fetchCityData = async () => {
			try {
				setIsLoadingGeocoding(true);
				const response = await fetch(
					`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
				);
				const data = await response.json();
				setCityName(data.city || data.locality || "");
				setCountry(data.countryName);
				setEmoji(convertToEmoji(data.countryCode));
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoadingGeocoding(false);
			}
		};
		if (lat && lng) fetchCityData();
	}, [lat, lng]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!cityName || !date) return;

		const newCity = {
			cityName,
			country,
			emoji,
			date,
			notes,
			position: { lat, lng },
		};

		await createCity(newCity);
		navigate("/app/cities");
	};

	if (isLoadingGeocoding) {
		return <Spinner />;
	}

	if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit} >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
				<DatePicker id="date" selected={date} onChange={date => setDate(date)} dateFormat="dd/MM/yyyy" />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;