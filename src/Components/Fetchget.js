import React, { useEffect, useState } from 'react';
import axios from 'axios';


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

export default function Fetchget() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  // const [reviews, setReviews] = useState([]);

  const itemsPerPage = 10;
  const apiUrl = 'https://api-v6ywsuyy3a-uc.a.run.app/data/characters';

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(apiUrl);
      setCharacters(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
/*
  const fetchCharacterById = async (characterId) => {
    try {
      const response = await axios.get(`${apiUrl}/${characterId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };*/

  const deleteCharacter = async (characterId) => {
    try {
      await axios.delete(`${apiUrl}/${characterId}`);
      setCharacters(characters.filter((character) => character.id !== characterId));
      setSelectedCharacter(null);
    } catch (error) {
      console.error(error);
    }
  };

  // const fetchReviews = async (characterId) => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/${characterId}/reviews`);
  //     setReviews(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     setReviews([]);
  //   }
  // };
  useEffect(() => {
    fetchCharacters();
  }, [currentPage]);

  const handleCharacterClick = async (character) => {
    setSelectedCharacter(character);
  };

  const totalPages = Math.ceil(characters.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="fetchget-container" style={{ fontFamily: 'Roboto, sans-serif', backgroundColor: 'steelblue', display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <div className="character-list-container" style={{ flex: 1, padding: '16px' }}>
        {isLoading ? (
          <p className="fetchget-loading">Loading...</p>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
              <thead style={{ backgroundColor: 'white' }}>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {characters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((character) => (
                  <tr className={`character-row ${selectedCharacter === character ? 'selected' : ''}`} onClick={() => handleCharacterClick(character)} style={{ backgroundColor: 'white' }} key={character.id}>
                    <td>{character.id}</td>
                    <td>{character.fullName}</td>
                    <td>
                      <img src={character.imageUrl} alt={character.fullName} className={`character-image ${selectedCharacter === character ? 'normal-image' : 'small-image'}`} style={{ width: selectedCharacter === character ? '100%' : '50px', height: 'auto', maxWidth: '100px' }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
              <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </div>
          </>
        )}
      </div>
      <div className={`character-details-container ${selectedCharacter ? 'visible' : ''}`} style={{ flex: 1, padding: '16px', overflowY: 'auto', backgroundColor: 'transparent' }}>
        {selectedCharacter && (
          <Card>
            <CardHeader title={<div style={{ textAlign: 'left' }}>Character Detail</div>} style={{ textAlign: 'center' }} />
            <CardContent>
              <div style={{ textAlign: 'center' }}>
                <div>
                  <Typography variant="h5">{selectedCharacter.fullName}</Typography>
                </div>
                <div>
                  <img src={selectedCharacter.imageUrl} alt={selectedCharacter.fullName} style={{ width: '100%', height: 'auto', maxWidth: '200px', margin: '0 auto' }} />
                </div>
              </div>
              <Typography variant="body1">First Name: {selectedCharacter.firstName}</Typography>
              <Typography variant="body1">Last Name: {selectedCharacter.lastName}</Typography>
              <Typography variant="body1">Title: {selectedCharacter.title}</Typography>
              <Typography variant="body1">Family: {selectedCharacter.family}</Typography>
              <Typography variant="body1">Image: {selectedCharacter.image}</Typography>
              <Typography variant="body1">Image URL: {selectedCharacter.imageUrl}</Typography>
              <button onClick={() => deleteCharacter(selectedCharacter.id)}>Delete</button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
