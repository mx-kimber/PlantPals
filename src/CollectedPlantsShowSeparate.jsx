import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function CollectedPlantsShowSeparate({ onUpdateCollectedPlant }) {
  const [collectedPlant, setCollectedPlant] = useState({});
  const [nickname, setNickname] = useState("");
  const [customImage, setCustomImage] = useState("");
  const [notes, setNotes] = useState("");
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isCustomImageModalOpen, setIsCustomImageModalOpen] = useState(false);
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  const params = useParams();

  const getShowCollectedPlant = () => {
    console.log(params.id);
    console.log("getting collected plant");
    axios.get(`http://localhost:3000/collected_plants/${params.id}.json`).then((response) => {
      console.log(response.data);
      setCollectedPlant(response.data);
      setNickname(response.data.nickname || "");
      setCustomImage(response.data.custom_image || "");
      setNotes(response.data.notes || "");
    });
  };

  useEffect(getShowCollectedPlant, []);

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleCustomImageChange = (event) => {
    setCustomImage(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmitNickname = (event) => {
    event.preventDefault();
    const updatedData = {
      nickname,
    };
    onUpdateCollectedPlant(collectedPlant.id, updatedData);
    setIsNicknameModalOpen(false);
  };

  const handleSubmitCustomImage = (event) => {
    event.preventDefault();
    const updatedData = {
      custom_image: customImage,
    };
    onUpdateCollectedPlant(collectedPlant.id, updatedData);
    setIsCustomImageModalOpen(false);
  };

  const handleSubmitNotes = (event) => {
    event.preventDefault();
    const updatedData = {
      notes,
    };
    onUpdateCollectedPlant(collectedPlant.id, updatedData);
    setIsNotesModalOpen(false);
  };

  return (
    <div>
      <h1>Collected Plant</h1>
      <p>ID: {collectedPlant.id}</p>
      <p>
        {collectedPlant.custom_image ? (
          <img src={collectedPlant.custom_image} alt="No image" />
        ) : (
          <img src={collectedPlant.img} alt="No image" />
        )}
      </p>
      <p>
        Nickname: {collectedPlant.nickname || "Give your plant a nickname!"}
        <button type="button" onClick={() => setIsNicknameModalOpen(true)}>
          Edit Nickname
        </button>
      </p>
      <p>
        Notes: {collectedPlant.notes}
        <button type="button" onClick={() => setIsNotesModalOpen(true)}>
          Edit Notes
        </button>
      </p>

      <button type="button" onClick={() => setIsCustomImageModalOpen(true)}>
        Edit Custom Image
      </button>

      <p>Common Name: {collectedPlant.common_name}</p>
      <p>Latin Name: {collectedPlant.latin_name}</p>
      <p>Category: {collectedPlant.category}</p>
      <p>Watering: {collectedPlant.watering}</p>
      <p>Ideal Light: {collectedPlant.light_ideal}</p>
      <p>Tolerated Light: {collectedPlant.light_tolerated}</p>
      <p>Climate: {collectedPlant.climate}</p>
      <p>
        Resource: <a href={collectedPlant.url}>{collectedPlant.url}</a>
      </p>

      {/* Edit Nickname Modal - will be changing these to handle in content  */}
      {isNicknameModalOpen && (
        <div>
          <h2>Edit Nickname</h2>
          <form onSubmit={handleSubmitNickname}>
            <input
              type="text"
              value={nickname}
              onChange={handleNicknameChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsNicknameModalOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Edit Custom Image Modal */}
      {isCustomImageModalOpen && (
        <div>
          <h2>Edit Custom Image</h2>
          <form onSubmit={handleSubmitCustomImage}>
            <input
              type="text"
              value={customImage}
              onChange={handleCustomImageChange}
            />
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsCustomImageModalOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Edit Notes Modal */}
      {isNotesModalOpen && (
        <div>
          <h2>Edit Notes</h2>
          <form onSubmit={handleSubmitNotes}>
            <textarea
              value={notes}
              onChange={handleNotesChange}
            ></textarea>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setIsNotesModalOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
