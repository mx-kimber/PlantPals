import axios from "axios";
import { useState, useEffect } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutLink } from "./LogoutLink";
import { Modal } from "./Modal";
import { PlantsIndex } from "./PlantsIndex";
import { PlantsShow } from "./PlantsShow";
import { CollectedPlantsIndex } from "./CollectedPlantsIndex";
import { CollectedPlantsShow} from "./CollectedPlantsShow";


export function Content() {
  const [errorMessage, setErrorMessage] = useState('');

  const [plants, setPlants] = useState([]);
  const [isPlantsShowVisible, setIsPlantsShowVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState({});

  const [collectedPlants, setCollectedPlants] = useState([]);
  const [isCollectedPlantsShowVisible, setIsCollectedPlantsShowVisible] = useState(false);
  const [currentCollectedPlant, setCurrentCollectedPlant] = useState({});
  
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

  const handleIndexCollectedPlants = () => {
    console.log("Fetching collected plants");
    axios.get("http://localhost:3000/collected_plants.json")
      .then((response) => {
        setCollectedPlants(response.data);
      });
  };

  const handleShowCollectedPlant = (collected) => {
    console.log("Showing collected plant:", collected);
    setIsCollectedPlantsShowVisible(true);
    setCurrentCollectedPlant(collected);
  };
 
  const handleClose = () => {
    console.log("handleClose");
    setIsPlantsShowVisible(false);
    setIsCollectedPlantsShowVisible(false);
  }

  useEffect(() => {
    handleIndexPlants();
    handleIndexCollectedPlants();
  }, []);

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      <Signup />
      <Login />
      <LogoutLink />
  
      <PlantsIndex plants={plants} 
        onShowPlant={handleShowPlant} />
  
      <Modal show={isPlantsShowVisible} 
        onClose={handleClose}>
        <PlantsShow plant={currentPlant} />
      </Modal>
  
      <CollectedPlantsIndex collectedPlants={collectedPlants}
        onShowCollectedPlant={handleShowCollectedPlant}
      />
  
      <Modal show={isCollectedPlantsShowVisible} 
        onClose={handleClose}>
        <CollectedPlantsShow collectedPlant={currentCollectedPlant} />
      </Modal>
    </div>
  );
}