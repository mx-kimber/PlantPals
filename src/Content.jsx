import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";

import { Modal } from "./Modal";
import { PlantsIndex } from "./PlantsIndex";
import { PlantsShow } from "./PlantsShow";
import { SchedulesIndex } from "./SchedulesIndex";
import { SchedulesShow } from "./SchedulesShow";
import { CollectedPlantsIndex } from "./CollectedPlantsIndex";
import { CollectedPlantsShow } from "./CollectedPlantsShow";
import { CollectedPlantShowSeparate } from "./CollectedPlantShowSeparate";
import { About } from "./About";
import { CollectedPlantEdit } from "./CollectedPlantEdit";

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
  const [isCollectedPlantEditVisible, setIsCollectedPlantEditVisible] = useState(false);
  
  const handleIndexPlants = () => {
    console.log("Fetching plants - OK");
    const startTime = new Date().getTime();
  
    axios.get("http://localhost:3000/plants.json")
      .then((response) => {
        const endTime = new Date().getTime();
        const duration = endTime - startTime;
        const durationInSeconds = duration / 1000;
          console.log("API/Plants Index loaded in", durationInSeconds, "seconds");
  
        setPlants(response.data);
        const firstPlant = response.data[0]
        setCurrentPlant(firstPlant);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Please Log in');
      });
  };

  const handleShowPlant = async (plant) => {
    console.log("Fetching plant - OK", plant);
    setIsPlantsShowVisible(false);
    if (currentPlant !== plant) {
      setCurrentPlant(plant);
    }
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

  const handleDestroySchedule = (schedule) => {
    const shouldDelete = window.confirm("Are you sure you want to delete this schedule?");
    if (shouldDelete) {
      console.log("Deleting Schedule - OK", schedule);
      axios.delete(`http://localhost:3000/schedules/${schedule.id}.json`).then((response) => {
        setSchedules(schedules.filter((p) => p.id !== schedule.id));
        handleClose();
        window.location.reload(); 
      });
    }
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

  const handleUpdateCollectedPlant = (id, params, successCallback) => {
    console.log("handling edit collected plant -OK", params);
    axios.patch(`http://localhost:3000/collected_plants/${id}.json`, params).then((response) => {
      setCollectedPlants(
        collectedPlants.map((collectedPlant) => {
          if (collectedPlant.id === response.data.id) {
            return response.data;
          } else {
            return collectedPlant;
          }
        })
      );
      successCallback();
      handleClose();
    });
  };

  const handleEditCollectedPlant = (collected) => {
    console.log("Showing collected plant edit - OK", collected);
    setCurrentCollectedPlant(collected);
    setIsCollectedPlantEditVisible(true);
  };

  const handleClose = () => {
    setIsPlantsShowVisible(false);
    setIsCollectedPlantsShowVisible(false);
    setIsSchedulesShowVisible(false);
    setIsCollectedPlantEditVisible(false);
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
          <>
            <PlantsIndex 
              plants={plants} 
              onShowPlant={handleShowPlant} />
            <PlantsShow 
              plant={currentPlant} />
          </>
          }
        />

        <Route path="/collected_plants" element={
          <>
            <CollectedPlantsIndex
              collectedPlants={collectedPlants}
              onShowCollectedPlant={handleShowCollectedPlant}
              onEditCollectedPlant={handleEditCollectedPlant}
              onUpdateCollectedPlant={handleUpdateCollectedPlant}
              />
            <CollectedPlantEdit
              collectedPlant={currentCollectedPlant}
              onEditCollectedPlant={handleEditCollectedPlant}
              onUpdateCollectedPlant={handleUpdateCollectedPlant} />
          </>
          }
        />


        <Route path="/collected_plants/:id" element={
          <CollectedPlantShowSeparate /> 
          } 
        />

        <Route path ="/schedules" element={
          <SchedulesIndex 
            schedules={schedules} 
            onShowSchedule={handleShowSchedule} 
            onUpdateSchedule={handleUpdateSchedule} 
            onDestroySchedule={handleDestroySchedule} />
          }
        />

        {/* Nesting multiple components - testing grounds */}

        <Route path="/test" element={
          <>
            <SchedulesIndex schedules={schedules} 
              onShowSchedule={handleShowSchedule}              
            />
            <CollectedPlantsIndex 
              collectedPlants={collectedPlants}
              onShowCollectedPlant= {handleShowCollectedPlant}            
            />
            <PlantsIndex 
              plants={plants} 
                onShowPlant={handleShowPlant} />
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
        onDestroySchedule={handleDestroySchedule}
      />
    </Modal>

    <Modal show={isCollectedPlantsShowVisible} 
      onClose={handleClose}>
      <CollectedPlantsShow 
        collectedPlant={currentCollectedPlant}

      />
    </Modal>

    <Modal show={isCollectedPlantEditVisible} onClose={handleClose}>
        <CollectedPlantEdit
          collectedPlant={currentCollectedPlant}
          onEditCollectedPlant={handleEditCollectedPlant}
          onUpdateCollectedPlant={handleUpdateCollectedPlant}
        />
      </Modal>
    
   </div>
  );
}



