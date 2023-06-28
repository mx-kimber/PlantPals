import axios from "axios";
import { useState, useEffect } from "react";
import { PlantsIndex } from "./PlantsIndex";

export function Content() {
  const [plants, setPlants] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleIndexPhotos = () => {
    axios.get("http://localhost:3000/plants.json")
      .then((response) => {
        console.log(response.data);
        setPlants(response.data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Failed to fetch plants. Please try again later.');
      });
  };

  useEffect(() => {
    handleIndexPhotos();
  }, []);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <PlantsIndex plants={plants} />
    </div>
  );
}