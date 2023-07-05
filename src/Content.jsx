import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";

import { Modal } from "./Modal";
import { PlantsIndex } from "./PlantsIndex";
import { PlantsShow } from "./PlantsShow";
import { SchedulesIndex } from "./SchedulesIndex"
import { SchedulesShow } from "./SchedulesShow";
import { CollectedPlantsIndex } from "./CollectedPlantsIndex";
import { CollectedPlantsShow} from "./CollectedPlantsShow";
import { CollectedPlantsEdit } from "./CollectedPlantsEdit";
import { About } from "./About"


export function Content(props) {


  const [errorMessage, setErrorMessage] = useState('');

  const [plants, setPlants] = useState([]);
  const [isPlantsShowVisible, setIsPlantsShowVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState({});

  const [schedules, setSchedules] = useState([]);
  const [isSchedulesShowVisible, setIsSchedulesShowVisible] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState({});
  

  const [collectedPlants, setCollectedPlants] = useState([]);
  const [isCollectedPlantsShowVisible, setIsCollectedPlantsShowVisible] = useState(false);
  const [currentCollectedPlant, setCurrentCollectedPlant] = useState({});

  const [isCollectedPlantsEditVisible, setIsCollectedPlantsEditVisible] = useState(false);
  
  
  
  const handleClose = () => {
    setIsPlantsShowVisible(false);
    setIsCollectedPlantsShowVisible(false);
    setIsCollectedPlantsEditVisible(false);
    setIsSchedulesShowVisible(false);
  }

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

  const handleIndexSchedules = () => {
    console.log("handleIndexSchedules");
    axios.get("http://localhost:3000/schedules.json").then((response) => {
      console.log(response.data);
      setSchedules(response.data);
    });
  };

  const handleShowSchedule = (schedule) => {
     console.log("handleShowSchedule", schedule);
     setIsSchedulesShowVisible(true);
     setCurrentSchedule(schedule);
   };


  const handleUpdateSchedule = (id, params, successCallback) => {
    console.log("handleUpdateSchedule", params);
    axios.patch(`http://localhost:3000/schedules/${id}.json`, params).then((response) => {
      setSchedules(
        schedules.map((schedule) => {
          if (schedule.id === response.data.id) {
            return response.data;
          } else {
            return schedule;
          }
        })
      );
      successCallback();
      handleClose();
    });
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
 

const handleEditCollectedPlant = (id, editPlant) => {
  console.log("handleEditCollectedPlant", id, editPlant);
  setIsCollectedPlantsEditVisible(true);
  setCurrentCollectedPlant(editPlant);
  setCurrentSchedule(editPlant);
};

  

  const handleUpdateCollectedPlant = (id, params) => {
    console.log("handleUpdateCollectedPlant", params);
    axios.patch(`http://localhost:3000/collected_plants/${id}.json`, params)
      .then((response) => {
        setCollectedPlants(
          collectedPlants.map((collectedPlant) => {
            if (collectedPlant.id === response.data.id) {
              return response.data;
            } else {
              return collectedPlant;
            }
          })
        );
       
        handleClose();
        window.location.reload(); 
      });
  };
  

  useEffect(() => {
    handleIndexPlants();
    handleIndexCollectedPlants();
    handleIndexSchedules();
  }, []);


  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}
      
{/* ROUTES */}

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/collected_plants" element={
          <CollectedPlantsIndex
            collectedPlants={collectedPlants}
            onShowCollectedPlant={handleShowCollectedPlant}
            onEditCollectedPlant={handleEditCollectedPlant}
            onShowSchedule={handleShowSchedule} 
            onUpdateSchedule={handleUpdateSchedule}/>
          }
        />



        <Route
          path="/collected_plants/:id"
          element={
            <CollectedPlantsEdit
              collectedPlant={currentCollectedPlant}
              onEditCollectedPlant={handleEditCollectedPlant}
              onUpdateCollectedPlant={handleUpdateCollectedPlant} 
              onClose={handleClose}
              onShowSchedule={handleShowSchedule} 
              onUpdateSchedule={handleUpdateSchedule}

              
            />
          }
        />
        <Route path ="/schedules" element={
          <SchedulesIndex 
            schedules={schedules} 
            onShowSchedule={handleShowSchedule} 
            onUpdateSchedule={handleUpdateSchedule}
            />
          }
        />
        
        <Route path="/plants" element={
            <PlantsIndex 
              plants={plants} 
              onShowPlant={handleShowPlant} 
            />
          }
        />

      </Routes>  
     
{/* MODALS  */}
  
    <Modal show={isPlantsShowVisible} onClose={handleClose}>
      <PlantsShow 
        plant={currentPlant} />
    </Modal>

    <Modal show={isCollectedPlantsShowVisible} 
    onClose={handleClose}>
      <CollectedPlantsShow 
        collectedPlant={currentCollectedPlant}
        onClose={handleClose}
      />
    </Modal>
    

    <Modal show={isCollectedPlantsEditVisible} 
    onClose={handleClose}>      
      <CollectedPlantsEdit 
      collectedPlant={currentCollectedPlant}
      onEditCollectedPlant={handleEditCollectedPlant}
      />
      
       
    </Modal>

    <Modal show={isSchedulesShowVisible} 
      onClose={handleClose}>
      <SchedulesShow 
        schedule={currentSchedule} 
        onShowSchedule={handleShowSchedule}
        onUpdateSchedule={handleUpdateSchedule}
      />
    </Modal>

   </div>
  );
}

