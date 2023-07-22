import axios from "axios";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Signup } from "./Signup";
import { Login } from "./Login";

import { Modal } from "./Modal";
import { PlantsIndex } from "./PlantsIndex";
import { PlantsShow } from "./PlantsShow";
import { SchedulesIndex } from "./SchedulesIndex";
import { SchedulesShow } from "./SchedulesShow";
import { SchedulesNew } from './SchedulesNew';

import { CollectedPlantsNew } from "./CollectedPlantsNew";
import { CollectedPlantsIndex } from "./CollectedPlantsIndex";
import { CollectedPlantsShow } from "./CollectedPlantsShow";
import { About } from "./About";
import { CollectedPlantEdit } from "./CollectedPlantEdit";

import { CollectedPlantsNoSchedule } from "./CollectedPlantsNoSchedule";

export function Content() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [plants, setPlants] = useState([]);
  const [isPlantsShowVisible, setIsPlantsShowVisible] = useState(false);
  const [currentPlant, setCurrentPlant] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [isSchedulesShowVisible, setIsSchedulesShowVisible] = useState(false);
  const [isSchedulesCreateModalVisible, setIsSchedulesCreateModalVisible] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState({});
  const [collectedPlants, setCollectedPlants] = useState([]);
  const [isCollectedPlantsShowVisible, setIsCollectedPlantsShowVisible] = useState(false);
  const [isCollectedPlantsNewVisible, setIsCollectedPlantsNewVisible] = useState(false);
  const [currentCollectedPlant, setCurrentCollectedPlant] = useState({});
  const [isCollectedPlantEditVisible, setIsCollectedPlantEditVisible] = useState(false);
  
  const handleLoginSuccess = (jwt) => {
    localStorage.setItem("jwt", jwt);
    axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
    setIsLoggedIn(true);
    navigate("/plants");
  };

  const handleIndexPlants = async () => {
    console.log("Fetching plants - OK");
    try {
      const startTime = new Date().getTime();
      const response = await axios.get("http://localhost:3000/plants.json");
      const endTime = new Date().getTime();
      const duration = endTime - startTime;
      const durationInSeconds = duration / 1000;
      console.log("API/Plants Index loaded in", durationInSeconds, "seconds");

      setPlants(response.data);
      const firstPlant = response.data[0];
      setCurrentPlant(firstPlant);
      setDataLoaded(true); 
    } catch (error) {
      console.error(error);
      setErrorMessage('Please Log in');
    }
  };

  const handleShowPlant = async (plant) => {
    console.log("Fetching plant - OK", plant);
    setIsPlantsShowVisible(false);
    if (currentPlant !== plant) {
      setCurrentPlant(plant);
    }
  };

  const handleIndexSchedules = async () => {
    console.log("Fetching Schedules: OK");
    axios.get("http://localhost:3000/schedules.json").then((response) => {
      setSchedules(response.data);
      const firstSchedule = response.data[0];
        setCurrentSchedule(firstSchedule);
    });
  };

  const handleShowSchedule = (schedule) => {
    console.log("Showing Schedule - OK", schedule);
    setIsSchedulesShowVisible(true);
    if (currentSchedule !== schedule) {
      setCurrentSchedule(schedule);
    }
    console.log("Parameters:", schedule);
    console.log("Is Schedules Show Visible?", isSchedulesShowVisible);
    console.log("Current Schedule:", currentSchedule);
  };

  const handleCreateSchedule = (params, successCallback) => {
    console.log("handleCreateSchedule - params:", params);
    axios.post("http://localhost:3000/schedules.json", params).then((response) => {
      console.log("handleCreateSchedule - response:", response.data);
      setSchedules([...schedules, response.data]);
  
      successCallback();
      handleClose();
      window.location.reload();
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

  const handleIndexCollectedPlants = async () => {
    console.log("Fetching collected plants - OK");
    axios.get("http://localhost:3000/collected_plants.json")
      .then((response) => {
        const collectedPlantsData = response.data;
        const sortedCollectedPlants = collectedPlantsData.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setCollectedPlants(sortedCollectedPlants);
        if (sortedCollectedPlants.length > 0) {
          const lastCollectedPlant = sortedCollectedPlants[sortedCollectedPlants.length - 1];
          setCurrentCollectedPlant(lastCollectedPlant);
        }
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
        handleClose();
        window.location.reload();
      });
  };

  const handleCreateCollectedPlant = (params, successCallback) => {
    console.log("handleCreateCollectedPlant - params:", params);
  
    axios.post("http://localhost:3000/collected_plants.json", params)
      .then((response) => {
        console.log("handleCreateCollectedPlant - response:", response.data);
        setCollectedPlants((prevCollectedPlants) => [...prevCollectedPlants, response.data]);
        successCallback();
      })
      .catch((error) => {
        console.error("handleCreateCollectedPlant - error:", error);
      });
  };

  const handleShowCollectedPlantsNew = () => {
    setIsCollectedPlantsNewVisible(true);
  };
  

  const handleClose = () => {
    setIsPlantsShowVisible(false);
    setIsCollectedPlantsShowVisible(false);
    setIsSchedulesShowVisible(false);
    setIsCollectedPlantEditVisible(false);
    setIsSchedulesCreateModalVisible(false);
    setIsCollectedPlantsNewVisible(false);
  }
  
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
        }
        setIsLoggedIn(!!jwt);
        if (isLoggedIn) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
          handleIndexPlants();
          handleIndexCollectedPlants();
          handleIndexSchedules();

          navigate("/plants");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoggedIn(false); 
      }
    };

    checkAuthentication();
  }, [isLoggedIn]);

  

  return (
    <div>
      {errorMessage && <p>{errorMessage}</p>}

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />

        <Route
          path="/plants"
          element={
            isLoggedIn ? (
              <>
                <PlantsIndex
                  plants={plants}
                  onShowPlant={handleShowPlant}
                  onCreateCollectedPlant={handleShowCollectedPlantsNew}
                />
                {dataLoaded ? (
                  <PlantsShow
                    plant={currentPlant}
                    onCreateCollectedPlant={(params) =>
                      handleCreateCollectedPlant(params, () => {
                        // note to self: handle opening a confirmation modal?
                      })
                    }
                  />
                ) : (
                  <div>Loading Plants Show...</div>
                )}
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/collected_plants"
          element={
            isLoggedIn ? (
              <>
                <CollectedPlantsIndex
                  collectedPlants={collectedPlants}
                  onShowCollectedPlant={handleShowCollectedPlant}
                  onEditCollectedPlant={handleEditCollectedPlant}
                  onUpdateCollectedPlant={handleUpdateCollectedPlant}
                  onCreateSchedule={handleCreateScheduleModal}
                />
                <CollectedPlantsShow
                  collectedPlant={currentCollectedPlant}
                  onCreateSchedule={handleCreateScheduleModal}
                />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/schedules/dashboard"
          element={
            isLoggedIn ? (
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
                />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
      
    {/* MODALS  */}
  
    <Modal show={isPlantsShowVisible} 
      onClose={handleClose}>
      <PlantsShow 
        plant={currentPlant} 
        onCreateCollectedPlant={handleCreateCollectedPlant}
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

    <Modal show={isCollectedPlantEditVisible}
      onClose={handleClose}>
      <CollectedPlantEdit
        collectedPlant={currentCollectedPlant}
        onEditCollectedPlant={handleEditCollectedPlant}
        onUpdateCollectedPlant={handleUpdateCollectedPlant}
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

    <Modal show={isCollectedPlantsNewVisible}
      onClose={handleClose}>
      <CollectedPlantsNew 
        onCreateCollectedPlant={handleCreateCollectedPlant} 
      />
    </Modal>
   
   </div>
  );
}



