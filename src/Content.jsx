import axios from "axios";
import { useState, useEffect } from "react";
import { PlantsIndex } from "./PlantsIndex";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";

export function Content() {
  const [plants, setPlants] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleIndexPlants = () => {
    axios.get("http://localhost:3000/plants.json")
      .then((response) => {
        console.log(response.data);
        setPlants(response.data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Please Log in');
      });
  };

  useEffect(() => {
    handleIndexPlants();
  }, []);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <PlantsIndex plants={plants} />
      <Signup />
      <Login />
      <LogoutLink />
    </div>
  );
}