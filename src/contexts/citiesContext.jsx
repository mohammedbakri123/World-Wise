import { createContext, useContext, useEffect, useState } from "react";

const citiesContext = createContext();
const BASE_URL = "http://localhost:8001";

export function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  async function GetCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("there is no city");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function FetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("there is no cities");
      } finally {
        setIsLoading(false);
      }
    }
    FetchCities();
  }, []);
  return (
    <citiesContext.Provider value={{ cities, isloading, currentCity, GetCity }}>
      {children}
    </citiesContext.Provider>
  );
}

export function useCities() {
  const context = useContext(citiesContext);
  if (context === undefined)
    throw new Error("Cities Context was used outside cities provider");
  return context;
}
