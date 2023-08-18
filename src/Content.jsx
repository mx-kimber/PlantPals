import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { UserContext } from "./UserContext";
import { AuthModal } from "./AuthModal"
import { Modal } from "./Modal";
import { PlantsIndex } from "./PlantsIndex";
import { PlantsShow } from "./PlantsShow";
import { SchedulesIndex } from "./SchedulesIndex";
import { SchedulesShow } from "./SchedulesShow";
import { SchedulesNew } from './SchedulesNew';
import Calendar from './Calendar';
import { ConfirmationModal} from "./ConfirmationModal";
import { CollectedPlantsIndex } from "./CollectedPlantsIndex";
import { CollectedPlantsShow } from "./CollectedPlantsShow";
import { About } from "./About";
import { CollectedPlantEdit } from "./CollectedPlantEdit";
import { CollectedPlantsNoSchedule } from "./CollectedPlantsNoSchedule";

import React from 'react'

export function Content() {
  const [reloadCollectedPlantsNoSchedule, setReloadCollectedPlantsNoSchedule] = useState(false);
  const { currentUser, loading } = useContext(UserContext);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [plants, setPlants] = useState([]);
  // const [isPlantsShowVisible, setIsPlantsShowVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [isSchedulesShowVisible, setIsSchedulesShowVisible] = useState(false);
  const [isSchedulesCreateModalVisible, setIsSchedulesCreateModalVisible] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState({});
  const [collectedPlants, setCollectedPlants] = useState([]);
  // const [isCollectedPlantsShowVisible, setIsCollectedPlantsShowVisible] = useState(false);
  const [currentCollectedPlant, setCurrentCollectedPlant] = useState({});
  const [isCollectedPlantEditVisible, setIsCollectedPlantEditVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
const onDragStart = (event, collectedPlant) => {
  const data = JSON.stringify({
    collectedPlantId: collectedPlant.id,
    currentUserId: currentUser.id
  });
  event.dataTransfer.setData('application/json', data);
  console.log('paramsDrag', data)
};

  const handleIndexPlants = async () => {
    console.log("Fetching plants - OK");
    if (currentUser) {
      try {
        const startTime = new Date().getTime();
        const response = await axios.get("http://localhost:3000/plants.json");
        const endTime = new Date().getTime();
        const duration = endTime - startTime;
        const durationInSeconds = duration / 1000;
        console.log("API/Plants Index loaded in", durationInSeconds, "seconds");
        //note to self: add feature where the welcome modal disappears after the amount of time for  duration or durantionInSeconds
  
        setPlants(response.data);
        const firstPlant = response.data[0];
        setCurrentPlant(firstPlant);
        setDataLoaded(true); 
      } catch (error) {
        console.error(error);
      }
    } else {
      setPlants([]);
      setCurrentPlant({});
    }
  };

  const handleShowPlant = async (plant) => {
    console.log("Fetching plant - OK", plant);
    // setIsPlantsShowVisible(false);
    if (currentPlant !== plant) {
      setCurrentPlant(plant);
    }
  };

  const handleIndexSchedules = async () => {
    console.log("Fetching Schedules: OK");
  
    if (currentUser) {
      try {
        const response = await axios.get("http://localhost:3000/schedules.json");
        const schedulesData = response.data;
        setSchedules(schedulesData);
        if (schedulesData.length > 0) {
          const firstSchedule = schedulesData[0];
          setCurrentSchedule(firstSchedule);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setSchedules([]);
      setCurrentSchedule({});
    }
  };

  const handleShowSchedule = (schedule) => {
    console.log("Showing Schedule - OK", schedule);
    setIsSchedulesShowVisible(true);
    if (currentSchedule !== schedule) {
      setCurrentSchedule(schedule);
    }
  };

  const handleCreateSchedule = (params, successCallback) => {
    console.log("handleCreateSchedule - params:", params);
    axios.post("http://localhost:3000/schedules.json", params).then((response) => {
      console.log("handleCreateSchedule - response:", response.data);
      setSchedules([...schedules, response.data]);
  
      successCallback();
      handleClose();
    }).catch((error) => {
      console.log("handleCreateSchedule - error:", error);
    });
  };
  

  const handleCreateScheduleModal = (getCreateForm) => {
    console.log("Showing schedule create - OK", getCreateForm);
    setCurrentCollectedPlant(getCreateForm);
    setIsSchedulesCreateModalVisible(true);
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
      axios.delete(`http://localhost:3000/schedules/${schedule.id}.json`).then(() => {
        setSchedules(schedules.filter((p) => p.id !== schedule.id));
        handleClose();
        setReloadCollectedPlantsNoSchedule(true);
      });
    }
  };

  const handleIndexCollectedPlants = async () => {
    console.log("Fetching collected plants - OK");
    if (currentUser) {
      try {
        const response = await axios.get("http://localhost:3000/collected_plants.json");
        const collectedPlantsData = response.data;
        const sortedCollectedPlants = collectedPlantsData.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setCollectedPlants(sortedCollectedPlants);
        if (sortedCollectedPlants.length > 0) {
          const lastCollectedPlant = sortedCollectedPlants[sortedCollectedPlants.length - 1];
          setCurrentCollectedPlant(lastCollectedPlant);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setCollectedPlants([]);
      setCurrentCollectedPlant({});
    }
  };
  
  const handleShowCollectedPlant = async(collected) => {
    console.log("Showing collected plant - OK", collected);
    // setIsCollectedPlantsShowVisible(false);
    if (currentCollectedPlant !== collected) {
      setCurrentCollectedPlant(collected);
    }
  };

  const handleEditCollectedPlant = (collected) => {
    console.log("Showing collected plant edit - OK", collected);
    setCurrentCollectedPlant(collected);
    setIsCollectedPlantEditVisible(true);
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
        handleIndexSchedules()
        handleClose();
      });
  };  

  const handleCreateCollectedPlant = (params, successCallback) => {
    console.log("handleCreateCollectedPlant - params:", params);
    axios
      .post("http://localhost:3000/collected_plants.json", params)
      .then((response) => {
        console.log("handleCreateCollectedPlant - response:", response.data);
        setCollectedPlants((prevCollectedPlants) => [...prevCollectedPlants, response.data]);
        setCurrentCollectedPlant(response.data);
        successCallback();
        setIsConfirmationModalVisible(true);
        setTimeout(() => {
          setIsConfirmationModalVisible(false);
        }, 3000);
        handleIndexCollectedPlants(); // Move this call outside the setTimeout
      })
      .catch((error) => {
        console.error("handleCreateCollectedPlant - error:", error);
      });
  };

  const handleDestroyCollectedPlant = (collectedPlant) => {
    const okToDelete = window.confirm("Are you sure you want to remove this from your collection?");
    if (okToDelete) {
      console.log("Deleting Collected Plant- OK", collectedPlant);
      axios.delete(`http://localhost:3000/collected_plants/${collectedPlant.id}.json`).then(() => {
        setCollectedPlants(collectedPlants.filter((p) => p.id !== collectedPlant.id));

        handleClose();
        window.location.reload();
      });
    }
  };
  
  const handleClose = () => {
    // setIsPlantsShowVisible(false);
    // setIsCollectedPlantsShowVisible(false);
    setIsSchedulesShowVisible(false);
    setIsCollectedPlantEditVisible(false);
    setIsSchedulesCreateModalVisible(false);
    setIsCollectedPlantEditVisible(false);
  }
  
  useEffect(() => {
    console.log("useEffect called");
    handleIndexPlants();
    handleIndexCollectedPlants();
    handleIndexSchedules();
      if (!loading && !currentUser) {
        setIsLoginModalVisible(true);
      }
      if (reloadCollectedPlantsNoSchedule) {
        handleIndexCollectedPlants();
        setReloadCollectedPlantsNoSchedule(false);
      }
    }, [currentUser, loading, reloadCollectedPlantsNoSchedule]);

  return (
    <div>
      <Routes>
        <Route path="/about" element={<About />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} /> */}
        
        <Route
          path="/plants"
          element={
            currentUser ? (
              <>
                <PlantsIndex
                  plants={plants}
                  onShowPlant={handleShowPlant}
                />
                {dataLoaded ? (
                  <PlantsShow
                    plant={currentPlant}
                    onCreateCollectedPlant={(params) =>
                      handleCreateCollectedPlant(params, () => {
                      })
                    }
                  />
                ) : (
                  <div>Loading Plants Show...</div>
                )}
              </>
            ) : null 
          }
        />

        <Route
          path="/collected_plants"
          element={
            
            currentUser ? (
              <>
                <CollectedPlantsIndex
                  collectedPlants={collectedPlants}
                  onShowCollectedPlant={handleShowCollectedPlant}
                  onUpdateCollectedPlant={handleUpdateCollectedPlant}
                  onDestoryCollectedPlant={handleDestroyCollectedPlant}
                  onCreateSchedule={handleCreateScheduleModal}
                />
                <CollectedPlantsShow
                  collectedPlant={currentCollectedPlant}
                  onCreateSchedule={handleCreateScheduleModal}
                  onEditCollectedPlant={handleEditCollectedPlant}
                  onDestroyCollectedPlant={handleDestroyCollectedPlant}
                />
              </>
            ) : null 
          }
        />

        <Route
          path="/schedules/dashboard"
          element={
            currentUser ? (
              <>
                <SchedulesIndex
                  schedules={schedules}
                  onShowSchedule={handleShowSchedule}
                  onUpdateSchedule={handleUpdateSchedule}
                  onDestroySchedule={handleDestroySchedule}
                />
                <CollectedPlantsNoSchedule
                  collectedPlants={collectedPlants}
                  onUpdateCollectedPlant={handleUpdateCollectedPlant}
                  onCreateSchedule={handleCreateScheduleModal}
                  onDragStart={onDragStart}
                />
                <Calendar 
                  schedules={schedules} 
                  collectedPlants={collectedPlants}
                  onCreateSchedule={handleCreateSchedule}
                  onDrop={handleCreateSchedule}
                  // onDrop={(collectedPlantId, currentDatetime, successCallback) => {
                  //   const newSchedule = {
                  //     collected_plant: collectedPlantId,
                  //     watering_start_date: currentDatetime,
                  //     // ...other schedule properties
                  //   };
                  //   handleCreateSchedule(newSchedule, successCallback);
                  // }}
                />
              </>
            ) : null 
          }
        />
      </Routes>
      
    {/* MODALS  */}

    {!currentUser && (
        <AuthModal show={isLoginModalVisible}>
          {isSignupVisible ? <Signup /> : <Login />}
          <button onClick={() => setIsSignupVisible(!isSignupVisible)}>
            {isSignupVisible ? 'Login' : 'Signup'}
          </button>
        </AuthModal>
      )}
  
    {/* <Modal show={isPlantsShowVisible} 
      onClose={handleClose}>
      <PlantsShow 
        plant={currentPlant} 
        onCreateCollectedPlant={handleCreateCollectedPlant}
      />
    </Modal> */}

    <Modal show={isSchedulesShowVisible} 
      onClose={handleClose}>
      <SchedulesShow 
        schedule={currentSchedule} 
        onUpdateSchedule={handleUpdateSchedule}
        onDestroySchedule={handleDestroySchedule}
      />
    </Modal>

    {/* <Modal show={isCollectedPlantsShowVisible} 
      onClose={handleClose}>
      <CollectedPlantsShow 
        collectedPlant={currentCollectedPlant}
        onEditCollectedPlant={handleEditCollectedPlant}
        onDestroyCollectedPlant={handleDestroyCollectedPlant}
      />
    </Modal> */}

    <Modal show={isCollectedPlantEditVisible}
      onClose={handleClose}>
      <CollectedPlantEdit
        collectedPlant={currentCollectedPlant}
        onEditCollectedPlant={handleEditCollectedPlant}
        onUpdateCollectedPlant={handleUpdateCollectedPlant}
        onDestroyCollectedPlant={handleDestroyCollectedPlant}
      />
       <SchedulesNew
        collectedPlant={currentCollectedPlant}
        onCreateSchedule={handleCreateSchedule}
      />
    </Modal>
    
    <Modal show={isSchedulesCreateModalVisible} 
      onClose={handleClose}>
      <SchedulesNew
        collectedPlant={currentCollectedPlant}
        onCreateSchedule={handleCreateSchedule}
      />
    </Modal>

    <ConfirmationModal show={isConfirmationModalVisible} 
      plant={currentPlant}>
    </ConfirmationModal>
   </div>
  );
}