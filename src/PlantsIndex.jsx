import React, { useState, useEffect } from 'react';

export function PlantsIndex(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const plantsPerPage = 6;
  const { plants } = props;
  const categories = [
    'Palm',
    'Anthurium',
    'Other',
    'Aglaonema',
    'Hanging',
    'Bromeliad',
    'Spathiphyllum',
    'Flower',
    'Aralia',
    'Ficus',
    'Sansevieria',
    'Foliage plant',
    'Dieffenbachia',
    'Philodendron',
    'Cactus & Succulent',
    'Schefflera',
    'Topiairy',
    'Fern',
    'Grass',
    'Ground Cover',
  ];

  useEffect(() => {
    setCurrentPage(0);
  }, [selectedCategory, searchTerm]);

  const startIndex = currentPage * plantsPerPage;
  const endIndex = startIndex + plantsPerPage;

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    setSearchTerm('');
  };

  const filteredPlants = plants
    ? plants.filter((plant) => {
        const searchTermMatch =
          searchTerm === '' ||
          (plant.common_name && plant.common_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (plant.latin_name && plant.latin_name.toLowerCase().includes(searchTerm.toLowerCase()));

        const categoryMatch =
          selectedCategory === '' ||
          (plant.category && plant.category.toLowerCase().includes(selectedCategory.toLowerCase()));

        return searchTermMatch && categoryMatch;
      })
    : [];

  const currentPlants = filteredPlants.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return prevPage + 1;
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return prevPage - 1;
    });
  };

  const handleShowPlant = (plant) => {
    props.onShowPlant(plant);
  };

  return (
    <div>
      <h1>All Plants</h1>

      <div>
        <label>
          {selectedCategory ? 'Search within selected category:' : 'Search all plants:'}
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder={selectedCategory ? `Search within ${selectedCategory} category...` : 'Search plants...'}
          />
        </label>
      </div>

      <div>
        <label>
          Search By Category:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredPlants.length === 0 && searchTerm !== '' ? (
        <p>No Plants Found</p>
      ) : (
        filteredPlants.length === 0 && (
          <p>Loading...</p>
        )
      )}

      {currentPlants.map((plant) => (
        <div key={plant.id}>
          <p>{plant.id}</p>
          <h2>{plant.common_name || plant.latin_name}</h2>
          <img
            className="rounded-image"
            src={plant.img}
            alt={plant.common_name || plant.latin_name}
            onClick={() => handleShowPlant(plant)}
          />
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

