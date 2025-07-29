// src/components/characters/CharacterManager.jsx
import React, { useState } from 'react';
import AllCharacters from './AllCharacters';
import AdminPanel from './AdminPanel';
import mockCharacters from './mockCharacters';
import { cleanCharacterData } from './formConfig';

// Rest of the code remains the same
const CharacterManager = () => {
  // State for tab management
  const [activeTab, setActiveTab] = useState('create');
  // State for character data (using mock data)
  const [characters, setCharacters] = useState(mockCharacters);
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  // State for editing character
  const [editingCharacter, setEditingCharacter] = useState(null);
  // State for loading state (for UI purposes)
  const [loading, setLoading] = useState(false);
  // Next ID counter for new characters
  const [nextId, setNextId] = useState(mockCharacters.length + 1);

  // Filter characters based on search query
  const filteredCharacters = characters.filter(character => 
    character.knownAs.toLowerCase().includes(searchQuery.toLowerCase()) ||
    character.OriginalName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle edit character click
  const handleEditCharacter = (character) => {
    setEditingCharacter(cleanCharacterData(character));
    setActiveTab('create'); // Switch to create tab with populated data
  };

  // Handle delete character
  const handleDeleteCharacter = (characterId) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      // Simulate API call to delete character
      console.log('Making DELETE request to delete character with ID:', characterId);
      console.log(`API Call: DELETE /api/characters/${characterId}`);
      
      // For mock data, we just filter out the character
      setCharacters(characters.filter(char => char._id !== characterId));
    }
  };

  // Handle character creation/update
  const handleCharacterSaved = (updatedCharacter, isEditing) => {
    // Create a clean copy of the character data
    const cleanCharacter = cleanCharacterData(updatedCharacter);
    
    if (isEditing) {
      // Simulate API call to update character
      console.log('Making PATCH request to update character with ID:', cleanCharacter._id);
      console.log(`API Call: PATCH /api/characters/${cleanCharacter._id}`);
      console.log('Data sent:', cleanCharacter);
      
      // Update existing character in state
      setCharacters(characters.map(char => 
        char._id === cleanCharacter._id ? cleanCharacter : char
      ));
    } else {
      // Create a new ID for the character
      const newId = String(nextId);
      setNextId(nextId + 1);
      
      // Add ID to the new character
      const newCharacter = {
        ...cleanCharacter,
        _id: newId
      };
      
      // Simulate API call to create character
      console.log('Making POST request to create new character');
      console.log('API Call: POST /api/characters');
      console.log('Data sent:', newCharacter);
      
      // Add new character to the list
      setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-500">
        Character Management System
      </h1>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'create' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
          }`}
          onClick={() => setActiveTab('create')}
        >
          {editingCharacter ? 'Edit Character' : 'Create Character'}
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'all' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-400'
          }`}
          onClick={() => {
            setActiveTab('all');
            setEditingCharacter(null);
          }}
        >
          All Characters
        </button>
      </div>
      
      {/* Content */}
      <div className="tab-content">
        {activeTab === 'create' ? (
          <AdminPanel 
            editingCharacter={editingCharacter} 
            setEditingCharacter={setEditingCharacter} 
            onCharacterSaved={handleCharacterSaved}
          />
        ) : (
          <AllCharacters 
            characters={filteredCharacters} 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery}
            onEdit={handleEditCharacter}
            onDelete={handleDeleteCharacter}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default CharacterManager;