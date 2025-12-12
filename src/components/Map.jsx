import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
function Map() {
  const [searchParam, setSearchParam] = useSearchParams();

  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");

  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        position {lat} : {lng}
      </h1>
    </div>
  );
}

export default Map;
