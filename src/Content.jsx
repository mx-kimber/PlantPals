import axios from "axios";
import { useState, useEffect } from "react";
import { PlantsIndex } from "./PlantsIndex";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { Modal } from "./Modal";
import { PlantsShow } from "./PlantsShow"

export function Content() {
  const [plants, setPlants] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isPlantsShowVisible, setIsPlantsShowVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState({});

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

  const handleShowPlant = (plant) => {
    console.log("handleshowPlant", plant);
    setIsPlantsShowVisible(true);
    setCurrentPlant(plant);
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsPlantsShowVisible(false);
  }

  useEffect(() => {
    handleIndexPlants();
  }, []);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <PlantsIndex plants={plants} onShowPlant={handleShowPlant} />
      
      <Modal show={isPlantsShowVisible} onClose={handleClose}>
        <PlantsShow plant={currentPlant} />
      </Modal>

      <Signup />
      <Login />
      <LogoutLink />
    </div>
  );
}