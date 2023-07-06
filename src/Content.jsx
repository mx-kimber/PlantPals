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
import { CollectedPlantShowSeparate } from "./CollectedPlantShowSeparate"
import { About } from "./About"
import { AddComponent } from "./AddComponent"

export function Content() {
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
 
  const handleIndexPlants = () => {
    axios.get("http://localhost:3000/plants.json")
      .then((response) => {
        setPlants(response.data);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Please Log in');
      });
  };

  const handleShowPlant = (plant) => {
    console.log("Fetching plant - OK", plant);
    setIsPlantsShowVisible(true);
    setCurrentPlant(plant);
  };


  const handleIndexSchedules = () => {
    console.log("Fetching Schedules: OK");
    axios.get("http://localhost:3000/schedules.json").then((response) => {
      setSchedules(response.data);
    });
  };

  const handleShowSchedule = (schedule) => {
     console.log("Showing Schedule - OK", schedule);
     setIsSchedulesShowVisible(true);
     setCurrentSchedule(schedule);
   };

  const handleUpdateSchedule = (id, params, successCallback) => {
    console.log("Updating Schedule - OK", params);
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
    console.log("Fetching collected plants - OK");
    axios.get("http://localhost:3000/collected_plants.json")
      .then((response) => {
        setCollectedPlants(response.data);
      });
  };

  const handleShowCollectedPlant = (collected) => {
    console.log("Showing collected plant - OK", collected);
    setIsCollectedPlantsShowVisible(true);
    setCurrentCollectedPlant(collected);
  };

  const handleClose = () => {
    setIsPlantsShowVisible(false);
    setIsCollectedPlantsShowVisible(false);
    setIsSchedulesShowVisible(false);
  }
  
  useEffect(() => {
    handleIndexPlants();
    handleIndexCollectedPlants();
    handleIndexSchedules();
  }, []);
  

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/plants" element={
            <PlantsIndex 
              plants={plants} 
              onShowPlant={handleShowPlant} 
            />
          }
        />

        <Route path="/collected_plants" element={
          <CollectedPlantsIndex
            collectedPlants={collectedPlants}
            onShowCollectedPlant={handleShowCollectedPlant}
            onShowSchedule={handleShowSchedule} />
          }
        />

        <Route path="/collected_plants/:id" element=
        {<CollectedPlantShowSeparate /> } />
       

        <Route path ="/schedules" element={
          <SchedulesIndex 
            schedules={schedules} 
            onShowSchedule={handleShowSchedule} 
            onUpdateSchedule={handleUpdateSchedule} />
          }
        />
        {/* Nesting multiple components - testing grounds */}
        <Route path="/test" element={
            <>
              <SchedulesIndex schedules={schedules} 
                onShowSchedule={handleShowSchedule} 
                onUpdateSchedule={handleUpdateSchedule} 
              />
              <CollectedPlantsIndex collectedPlants={collectedPlants}
                onShowCollectedPlant={handleShowCollectedPlant}
                onShowSchedule={handleShowSchedule}
              />
              <AddComponent />
            </>
          }       
        />


      </Routes>  
      {/* <AddComponent /> */}
      
    {/* MODALS  */}
  
    <Modal show={isPlantsShowVisible} 
      onClose={handleClose}>
      <PlantsShow 
        plant={currentPlant} 
      />
    </Modal>

    <Modal show={isSchedulesShowVisible} 
      onClose={handleClose}>
      <SchedulesShow 
        schedule={currentSchedule} 
        onUpdateSchedule={handleUpdateSchedule}
      />
    </Modal>

    <Modal show={isCollectedPlantsShowVisible} 
      onClose={handleClose}>
      <CollectedPlantsShow 
        collectedPlant={currentCollectedPlant}
        onShowSchedule={currentSchedule}
      />
    </Modal>
    
   </div>
  );
}



