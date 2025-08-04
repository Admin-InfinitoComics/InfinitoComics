// src/components/characters/CharacterManager.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllCharacters from './AllCharacters';
import AdminPanel from './AdminPanel';
import { cleanCharacterData } from './formConfig';
import { fetchCharactersData, deleteCharacter, updateCharacter, createCharacter} from '../../services/characterService';

const CharacterManager = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [originalCharacter, setOriginalCharacter] = useState(null); // For PATCH
  const [loading, setLoading] = useState(true);
  const [nextId, setNextId] = useState(1);

  // Fetch all characters from backend
  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const response = await fetchCharactersData();
      setCharacters(response.data.data || []);
      setNextId((response.data.data?.length || 0) + 1);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setCharacters([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const filteredCharacters = characters.filter(character => 
    (character.knownAs?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     character.originalName?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Helper: Get only changed fields for PATCH
  function getChangedFields(original, updated) {
    const changed = {};
    Object.keys(updated).forEach(key => {
      // For arrays, compare as strings
      if (Array.isArray(updated[key]) && Array.isArray(original[key])) {
        if (JSON.stringify(updated[key]) !== JSON.stringify(original[key])) {
          changed[key] = updated[key];
        }
      }
      // For files, always send if present
      else if (updated[key] instanceof File) {
        changed[key] = updated[key];
      }
      // For other types
      else if (updated[key] !== original[key]) {
        changed[key] = updated[key];
      }
    });
    return changed;
  }

  const handleEditCharacter = (character) => {
    const cleaned = cleanCharacterData(character);
    setEditingCharacter(cleaned);
    setOriginalCharacter(cleaned); // Store original for PATCH comparison
    setActiveTab('create');
  };

  const handleDeleteCharacter = async (characterId) => {
    if (window.confirm('Are you sure you want to delete this character?')) {
      try {
        const res = await deleteCharacter(characterId);
        await fetchCharacters(); // Refresh the list after successful delete
      } catch (error) {
        alert('Failed to delete character from server. Removing locally.');
        setCharacters(characters.filter(char => char._id !== characterId));
      }
    }
  };

  const handleCharacterSaved = async (updatedCharacter, isEditing) => {
    const cleanCharacter = cleanCharacterData(updatedCharacter);

    if (isEditing) {
      if (!cleanCharacter._id) {
        alert('Character ID missing for update!');
        return;
      }

      // Get only changed fields
      const changedFields = getChangedFields(originalCharacter, cleanCharacter);

      // If nothing changed, do nothing
      if (Object.keys(changedFields).length === 0) {
        alert('No changes detected.');
        setEditingCharacter(null);
        setOriginalCharacter(null);
        return;
      }

      // Build FormData if any field is a File, else send JSON
      let dataToSend = changedFields;
      let headers = {};
      const hasFile = Object.values(changedFields).some(
        val => val instanceof File
      );
      if (hasFile) {
        const formData = new FormData();
        Object.keys(changedFields).forEach(key => {
          if (changedFields[key] instanceof File) {
            formData.append(key, changedFields[key]);
          } else if (Array.isArray(changedFields[key])) {
            changedFields[key].forEach(item => formData.append(key, item));
          } else {
            formData.append(key, changedFields[key]);
          }
        });
        dataToSend = formData;
        headers = {}; // Let Axios set Content-Type for FormData
      } else {
        headers = { 'Content-Type': 'application/json' };
      }

      try {
        const res = await updateCharacter(cleanCharacter._id,dataToSend,headers);
        await fetchCharacters();
      } catch (error) {
        alert('Failed to update character on server.');
      }
      setEditingCharacter(null);
      setOriginalCharacter(null);
    } else {
      // ---- POST REQUEST FOR CREATE ----
      const newId = String(nextId);
      setNextId(nextId + 1);
      const formData = new FormData();
      Object.keys(cleanCharacter).forEach(key => {
        if (key !== 'mainImage' && key !== 'storylineImage' && key !== 'originImage') {
          if (Array.isArray(cleanCharacter[key])) {
            cleanCharacter[key].forEach(item => {
              formData.append(key, item);
            });
          } else {
            formData.append(key, cleanCharacter[key]);
          }
        }
      });
      formData.append('_id', newId);
      if (cleanCharacter.mainImage) {
        if (cleanCharacter.mainImage instanceof File) {
          formData.append('mainImage', cleanCharacter.mainImage);
        } else if (typeof cleanCharacter.mainImage === 'string') {
          formData.append('mainImageUrl', cleanCharacter.mainImage);
        }
      }
      if (cleanCharacter.storylineImage) {
        if (cleanCharacter.storylineImage instanceof File) {
          formData.append('storylineImage', cleanCharacter.storylineImage);
        } else if (typeof cleanCharacter.storylineImage === 'string') {
          formData.append('storylineImageUrl', cleanCharacter.storylineImage);
        }
      }
      if (cleanCharacter.originImage) {
        if (cleanCharacter.originImage instanceof File) {
          formData.append('originImage', cleanCharacter.originImage);
        } else if (typeof cleanCharacter.originImage === 'string') {
          formData.append('originImageUrl', cleanCharacter.originImage);
        }
      }
      try {
        const res = await createCharacter(formData);
        await fetchCharacters();
      } catch (error) {
        const newCharacter = { ...cleanCharacter, _id: newId };
        setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-500">
        Character Management System
      </h1>
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
            setOriginalCharacter(null);
          }}
        >
          All Characters
        </button>
      </div>
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
            onRefresh={fetchCharacters}
          />
        )}
      </div>
    </div>
  );
};

export default CharacterManager;