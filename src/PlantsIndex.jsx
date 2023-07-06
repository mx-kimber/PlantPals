import React, { useState } from 'react';

export function PlantsIndex(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const plantsPerPage = 3; 
  const { plants } = props;
  const filteredPlants = plants.filter(
    (plant) =>
      plant.common_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.latin_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

   filteredPlants.sort((a, b) => a.category.localeCompare(b.category));

  const startIndex = currentPage * plantsPerPage;
  const endIndex = startIndex + plantsPerPage;

  const currentPlants = filteredPlants.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of the page
      return prevPage + 1;
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => {
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of the page
      return prevPage - 1;
    });
  };

  return (
    <div>
      <h1>All Plants</h1>
  
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search plants..."
      />

      {currentPlants.map((plant) => (
        <div key={plant.id}>
          <h2>{plant.common_name}</h2>
          <img className="rounded-image" src={plant.img} alt={plant.common_name} />
          <p>Latin Name: {plant.latin_name}</p>
          <p>Watering: {plant.watering}</p>
          <p>Ideal Light: {plant.light_ideal}</p>
          <p>Category: {plant.category}</p>
          <button onClick={() => props.onShowPlant(plant)}>More info</button>
        </div>
      ))}

      {currentPage > 0 && (
        <button onClick={handlePreviousPage}>Show Previous 3</button>
      )}

      {filteredPlants.length > endIndex && (
        <button onClick={handleNextPage}>Show Next 3</button>
      )}
    </div>
  );
}

