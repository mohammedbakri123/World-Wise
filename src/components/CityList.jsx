import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../contexts/citiesContext";

function CityList() {
  const { cities, isloading } = useCities();

  if (isloading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add you first city by clicking the city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => {
        return <CityItem key={city.id} city={city} />;
      })}
    </ul>
  );
}

export default CityList;
