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
      const firstSchedule = response.data[0];
        setCurrentSchedule(firstSchedule); // Update to setCurrentCollectedPlant
    });
  };

  const handleShowSchedule = (schedule) => {
    console.log("Showing Schedule - OK", schedule);
    setIsSchedulesShowVisible(true);
    if (currentSchedule !== schedule) {
      setCurrentSchedule(schedule);
    }
    // Log the parameters passed to the function
    console.log("Parameters:", schedule);
    // Log additional information
    console.log("Is Schedules Show Visible?", isSchedulesShowVisible);
    console.log("Current Schedule:", currentSchedule);
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
      window.location.reload();
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
      const collectedPlantsData = response.data;
      setCollectedPlants(collectedPlantsData);
      
      const firstCollectedPlant = collectedPlantsData[0];
      setCurrentCollectedPlant(firstCollectedPlant);
      
      const collectedPlantIds = collectedPlantsData.map((collectedPlant) => collectedPlant.id);
      axios.get(`http://localhost:3000/schedules.json?collected_plant_ids=${collectedPlantIds.join(',')}`)
        .then((response) => {
          const schedulesData = response.data;
          setSchedules(schedulesData);
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

  const handleShowCollectedPlant = async(collected) => {
    console.log("Showing collected plant - OK", collected);
    setIsCollectedPlantsShowVisible(false);
    if (currentCollectedPlant !== collected) {
      setCurrentCollectedPlant(collected);
    }
  };

  const handleUpdateCollectedPlant = (id, params, successCallback) => {
    console.log("Handling edit collected plant - OK", params);
    axios.patch(`http://localhost:3000/collected_plants/${id}.json`, params)
      .then((response) => {
        setCollectedPlants((prevCollectedPlants) => {
          const updatedCollectedPlants = prevCollectedPlants.map((collectedPlant) => {
            if (collectedPlant.id === response.data.id) {
              return response.data;
            } else {
              return collectedPlant;
            }
          });
          setCurrentCollectedPlant(response.data);
          return updatedCollectedPlants;
        });
        successCallback();
        handleClose();
        window.location.reload();
      });
  };

  const handleEditCollectedPlant = (collected, successCallback) => {
    console.log("Showing collected plant edit - OK", collected);
    setCurrentCollectedPlant(collected);
    setIsCollectedPlantEditVisible(true);
    successCallback();
    window.location.reload();
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
            <SchedulesShow 
              schedule={currentSchedule} 
              onUpdateSchedule={handleUpdateSchedule}
              onDestroySchedule={handleDestroySchedule}
              />
            <CollectedPlantsIndex
              collectedPlants={collectedPlants}
              onShowCollectedPlant={handleShowCollectedPlant}
              onEditCollectedPlant={handleEditCollectedPlant}
              onUpdateCollectedPlant={handleUpdateCollectedPlant}
              
              onShowSchedule={handleShowSchedule}
              schedule={currentSchedule}
              
            />
            <CollectedPlantsShow
              collectedPlant={currentCollectedPlant}
              
            />
          </>
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
        </Routes>
      
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



