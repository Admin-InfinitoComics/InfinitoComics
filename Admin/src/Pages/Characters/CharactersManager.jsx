import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

// Mock data for characters - with flat structure only
const mockCharacters = [
  {
    _id: '1',
    knownAs: 'Superman',
    OriginalName: 'Clark Kent',
    BirthDate: '1986-06-18',
    character: ['Brave', 'Honest', 'Selfless'],
    interest: ['Journalism', 'Justice'],
    weapon: ['Fists', 'Heat Vision'],
    capability: ['Flight', 'Super Strength', 'X-Ray Vision'],
    powers: ['Invulnerability', 'Super Speed'],
    height: '6\'3"',
    weight: '235 lbs',
    age: '35',
    species: 'Kryptonian',
    eyes: 'Blue',
    hair: 'Black',
    limitation: ['Kryptonite', 'Magic'],
    description: 'Last son of Krypton and Earth\'s greatest hero.',
    storylineText: 'Sent to Earth as a baby before his home planet Krypton exploded, Clark Kent was raised by farmers and discovered his powers as he grew up.',
    storylineImage: 'https://via.placeholder.com/400x300?text=Superman+Story',
    originText: 'Born on Krypton to Jor-El and Lara, Kal-El was sent to Earth moments before Krypton\'s destruction.',
    originImage: 'https://via.placeholder.com/400x300?text=Superman+Origin',
    about: 'Superman stands for truth, justice, and a better tomorrow. He uses his incredible powers to protect Earth from threats both domestic and cosmic.',
    gender: 'male',
    mainImage: 'https://via.placeholder.com/200x200?text=Superman',
  },
  {
    _id: '2',
    knownAs: 'Batman',
    OriginalName: 'Bruce Wayne',
    BirthDate: '1985-02-19',
    character: ['Intelligent', 'Determined', 'Strategic'],
    interest: ['Criminology', 'Martial Arts', 'Technology'],
    weapon: ['Batarangs', 'Grappling Hook', 'Utility Belt'],
    capability: ['Detective Skills', 'Martial Arts Mastery', 'Tactical Genius'],
    powers: [],
    height: '6\'2"',
    weight: '210 lbs',
    age: '38',
    species: 'Human',
    eyes: 'Blue',
    hair: 'Black',
    limitation: ['Human Physiology', 'No Superpowers'],
    description: 'The Dark Knight of Gotham City who strikes fear into criminals.',
    storylineText: 'After witnessing his parents\' murder as a child, Bruce Wayne trained his mind and body to become Batman, Gotham\'s vigilante protector.',
    storylineImage: 'https://via.placeholder.com/400x300?text=Batman+Story',
    originText: 'Born to wealthy parents Thomas and Martha Wayne, Bruce\'s life changed when they were murdered in front of him in Crime Alley.',
    originImage: 'https://via.placeholder.com/400x300?text=Batman+Origin',
    about: 'Batman is the superhero protector of Gotham City, a man dressed like a bat who fights against evil and strikes terror into the hearts of criminals everywhere.',
    gender: 'male',
    mainImage: 'https://via.placeholder.com/200x200?text=Batman',
  },
  {
    _id: '3',
    knownAs: 'Wonder Woman',
    OriginalName: 'Diana Prince',
    BirthDate: '1987-03-22',
    character: ['Compassionate', 'Warrior', 'Diplomatic'],
    interest: ['Peace', 'Truth', 'Ancient History'],
    weapon: ['Lasso of Truth', 'Bracelets of Submission', 'Sword'],
    capability: ['Superhuman Strength', 'Combat Training', 'Tactical Leadership'],
    powers: ['Immortality', 'Flight', 'Superhuman Reflexes'],
    height: '6\'0"',
    weight: '165 lbs',
    age: '5000+',
    species: 'Amazon',
    eyes: 'Blue',
    hair: 'Black',
    limitation: ['Can be injured by weapons of the gods', 'Vulnerable to piercing weapons'],
    description: 'Amazonian princess and ambassador of peace.',
    storylineText: 'Diana left her home of Themyscira to help stop World War I and discovered her calling as a protector of both innocents and truth in the world of men.',
    storylineImage: 'https://via.placeholder.com/400x300?text=Wonder+Woman+Story',
    originText: 'Sculpted from clay by her mother Queen Hippolyta and given life by the Greek gods, Diana was raised on the hidden island of Themyscira.',
    originImage: 'https://via.placeholder.com/400x300?text=Wonder+Woman+Origin',
    about: 'Wonder Woman serves as an ambassador of the Amazon people and a symbol of truth, justice, and equality in a world dominated by men.',
    gender: 'female',
    mainImage: 'https://via.placeholder.com/200x200?text=Wonder+Woman',
  }
];

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
    // Make a copy of the character to ensure we don't have storyLine or origin keys
    const cleanCharacter = { ...character };
    
    // Explicitly remove any storyLine or origin keys if they exist
    if (cleanCharacter.storyLine) delete cleanCharacter.storyLine;
    if (cleanCharacter.origin) delete cleanCharacter.origin;
    
    setEditingCharacter(cleanCharacter);
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
    // Create a clean copy of the character data without storyLine or origin keys
    const cleanCharacter = { ...updatedCharacter };
    
    // Ensure these keys don't exist in the data being sent
    if (cleanCharacter.storyLine) delete cleanCharacter.storyLine;
    if (cleanCharacter.origin) delete cleanCharacter.origin;
    
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

// All Characters component
const AllCharacters = ({ characters, searchQuery, setSearchQuery, onEdit, onDelete, loading }) => {
  return (
    <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-xl max-w-4xl mx-auto">
      <div className="mb-6">
        <label className="block text-gray-300 font-medium mb-2">Search Characters</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by character name..."
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
        />
      </div>
      
      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-400">Loading characters...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {characters.length === 0 ? (
            <p className="text-center text-gray-400">No characters found</p>
          ) : (
            characters.map((character) => (
              <div 
                key={character._id} 
                className="bg-gray-700 p-4 rounded-lg flex items-center justify-between hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {character.mainImage && (
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-600">
                      <img 
                        src={character.mainImage} 
                        alt={character.knownAs} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-white">{character.knownAs}</h3>
                    <p className="text-sm text-gray-300">{character.OriginalName}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => onEdit(character)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(character._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

// Modified AdminPanel to handle editing
const AdminPanel = ({ editingCharacter, setEditingCharacter, onCharacterSaved }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      knownAs: '',
      OriginalName: '',
      BirthDate: '',
      character: [],
      interest: [],
      weapon: [],
      capability: [],
      powers: [],
      height: '',
      weight: '',
      age: '',
      species: '',
      eyes: '',
      hair: '',
      limitation: [],
      description: '',
      storylineText: '',
      storylineImage: null,
      originText: '',
      originImage: null,
      about: '',
      gender: '',
      mainImage: null,
    },
  });

  // State for dynamic array fields (e.g., "chips")
  const [powerInput, setPowerInput] = useState('');
  const [characterInput, setCharacterInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [weaponInput, setWeaponInput] = useState('');
  const [capabilityInput, setCapabilityInput] = useState('');
  const [limitationInput, setLimitationInput] = useState('');

  // State for existing images (when editing)
  const [existingMainImage, setExistingMainImage] = useState(null);
  const [existingStoryLineImage, setExistingStoryLineImage] = useState(null);
  const [existingOriginImage, setExistingOriginImage] = useState(null);

  // Watch for images to display previews
  const mainImageFile = watch('mainImage');
  const storylineImageFile = watch('storylineImage');
  const originImageFile = watch('originImage');
  
  // Create URLs for image previews
  const mainImageURL = mainImageFile && mainImageFile[0] ? URL.createObjectURL(mainImageFile[0]) : null;
  const storylineImageURL = storylineImageFile && storylineImageFile[0] ? URL.createObjectURL(storylineImageFile[0]) : null;
  const originImageURL = originImageFile && originImageFile[0] ? URL.createObjectURL(originImageFile[0]) : null;

  // Populate form with editing character data when available
  useEffect(() => {
    if (editingCharacter) {
      // Set basic fields
      Object.keys(editingCharacter).forEach(key => {
        if (key === 'mainImage') {
          // Store existing image URL
          setExistingMainImage(editingCharacter.mainImage);
        } else if (key === 'storylineImage') {
          // Store existing storyline image URL
          setExistingStoryLineImage(editingCharacter.storylineImage);
        } else if (key === 'originImage') {
          // Store existing origin image URL
          setExistingOriginImage(editingCharacter.originImage);
        } else if (Array.isArray(editingCharacter[key])) {
          setValue(key, editingCharacter[key]);
        } else {
          setValue(key, editingCharacter[key]);
        }
      });
    } else {
      // Clear existing images when creating a new character
      setExistingMainImage(null);
      setExistingStoryLineImage(null);
      setExistingOriginImage(null);
    }
  }, [editingCharacter, setValue]);

  // Generic function to add a value to an array field
  const addToArray = (fieldName, inputState, setInputState) => {
    if (inputState.trim() !== '') {
      const currentArray = watch(fieldName) || [];
      setValue(fieldName, [...currentArray, inputState.trim()]);
      setInputState('');
    }
  };

  // Generic function to remove a value from an array field
  const removeFromArray = (fieldName, index) => {
    const currentArray = watch(fieldName);
    const newArray = [...currentArray];
    newArray.splice(index, 1);
    setValue(fieldName, newArray);
  };

  // Handle form submission (create or update) with flat structure only
  const onSubmit = (data) => {
    // Create a copy of the submitted data
    const characterData = { ...data };
    
    // Handle images (in real app would upload files)
    // Here we'll just keep existing URLs if no new file is provided
    if (!mainImageFile || !mainImageFile[0]) {
      characterData.mainImage = existingMainImage;
    } else {
      // Simulate a new URL for the uploaded file
      characterData.mainImage = URL.createObjectURL(mainImageFile[0]);
    }
    
    // Handle storyline image
    if (!storylineImageFile || !storylineImageFile[0]) {
      characterData.storylineImage = existingStoryLineImage;
    } else {
      characterData.storylineImage = URL.createObjectURL(storylineImageFile[0]);
    }
    
    // Handle origin image
    if (!originImageFile || !originImageFile[0]) {
      characterData.originImage = existingOriginImage;
    } else {
      characterData.originImage = URL.createObjectURL(originImageFile[0]);
    }
    
    // Ensure these keys don't exist in the data being sent
    if (characterData.storyLine) delete characterData.storyLine;
    if (characterData.origin) delete characterData.origin;
    
    // If editing, keep the ID
    if (editingCharacter) {
      characterData._id = editingCharacter._id;
      onCharacterSaved(characterData, true);
      alert('Character updated successfully!');
    } else {
      onCharacterSaved(characterData, false);
      alert('Character created successfully!');
    }
    
    // Reset form and state
    reset();
    setEditingCharacter(null);
  };

  // Handle cancel edit
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
      setEditingCharacter(null);
      reset();
    }
  };

  const formFields = [
    { name: 'knownAs', label: 'Known As', type: 'text', validation: { required: 'Known As is required' } },
    { name: 'OriginalName', label: 'Original Name', type: 'text', validation: { required: 'Original Name is required' } },
    { name: 'BirthDate', label: 'Birth Date', type: 'date', validation: { required: 'Birth Date is required' } },
    { name: 'height', label: 'Height', type: 'text', validation: { required: 'Height is required' } },
    { name: 'weight', label: 'Weight', type: 'text', validation: { required: 'Weight is required' } },
    { name: 'age', label: 'Age', type: 'number', validation: { required: 'Age is required', valueAsNumber: true, min: { value: 1, message: 'Age must be at least 1' } } },
    { name: 'species', label: 'Species', type: 'text', validation: { required: 'Species is required' } },
    { name: 'eyes', label: 'Eyes', type: 'text', validation: { required: 'Eyes color is required' } },
    { name: 'hair', label: 'Hair', type: 'text', validation: { required: 'Hair color is required' } },
    { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female', 'Other'], validation: { required: 'Gender is required' } },
  ];

  const renderChipField = (fieldName, label, inputState, setInputState) => (
    <div className="flex flex-col gap-1 col-span-2">
      <label className="block text-gray-300 font-medium">{label}</label>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {watch(fieldName)?.map((item, index) => (
          <div key={index} className="bg-blue-600 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm">
            <span>{item}</span>
            <button
              type="button"
              onClick={() => removeFromArray(fieldName, index)}
              className="text-white hover:text-gray-200"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={inputState}
          onChange={(e) => setInputState(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addToArray(fieldName, inputState, setInputState);
            }
          }}
          className="flex-grow p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          placeholder={`Add a new ${label.toLowerCase().slice(0, -1)}...`}
        />
        <button
          type="button"
          onClick={() => addToArray(fieldName, inputState, setInputState)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
      {errors[fieldName] && <span className="text-red-500 text-sm mt-1">{errors[fieldName].message}</span>}
    </div>
  );

  return (
    <div className="bg-gray-800 p-6 md:p-10 rounded-lg shadow-xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {editingCharacter ? `Edit Character: ${editingCharacter.knownAs}` : 'Create New Character'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Main Character Image Upload */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-300 font-medium mb-2">Main Character Image</label>
          <input
            type="file"
            accept="image/*"
            {...register('mainImage', { required: !editingCharacter && 'Main character image is required' })}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          {errors.mainImage && <span className="text-red-500 text-sm mt-1">{errors.mainImage.message}</span>}
          {mainImageURL ? (
            <div className="mt-4 w-40 h-40 overflow-hidden rounded-lg border-2 border-gray-700">
              <img src={mainImageURL} alt="Main character preview" className="w-full h-full object-cover" />
            </div>
          ) : existingMainImage && (
            <div className="mt-4 w-40 h-40 overflow-hidden rounded-lg border-2 border-gray-700">
              <img src={existingMainImage} alt="Current character" className="w-full h-full object-cover" />
              <p className="text-sm text-gray-400 mt-1">Current image (upload a new one to change)</p>
            </div>
          )}
        </div>

        {/* Simple Text/Number/Date/Select Fields */}
        {formFields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <label className="block text-gray-300 font-medium">{field.label}</label>
            {field.type === 'select' ? (
              <select
                {...register(field.name, field.validation)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select a {field.label.toLowerCase()}</option>
                {field.options.map((option) => (
                  <option key={option} value={option.toLowerCase()}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                {...register(field.name, field.validation)}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              />
            )}
            {errors[field.name] && <span className="text-red-500 text-sm mt-1">{errors[field.name].message}</span>}
          </div>
        ))}

        {/* Array of Strings (Chips) Fields */}
        {renderChipField('powers', 'Powers', powerInput, setPowerInput)}
        {renderChipField('character', 'Character', characterInput, setCharacterInput)}
        {renderChipField('interest', 'Interest', interestInput, setInterestInput)}
        {renderChipField('weapon', 'Weapon', weaponInput, setWeaponInput)}
        {renderChipField('capability', 'Capability', capabilityInput, setCapabilityInput)}
        {renderChipField('limitation', 'Limitations', limitationInput, setLimitationInput)}

        {/* Text Area Fields */}
        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-300 font-medium mb-1">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows="4"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          ></textarea>
          {errors.description && <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>}
        </div>

        <div className="col-span-1 md:col-span-2">
          <label className="block text-gray-300 font-medium mb-1">About</label>
          <textarea
            {...register('about', { required: 'About section is required' })}
            rows="4"
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
          ></textarea>
          {errors.about && <span className="text-red-500 text-sm mt-1">{errors.about.message}</span>}
        </div>

        {/* Story Line Fields - flat structure */}
        <div className="col-span-1 md:col-span-2 border-t border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-3">Story Line</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Story Line Text</label>
              <textarea
                {...register('storylineText', { required: 'Story line text is required' })}
                rows="4"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              ></textarea>
              {errors.storylineText && <span className="text-red-500 text-sm mt-1">{errors.storylineText.message}</span>}
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-1">Story Line Image</label>
              <input
                type="file"
                accept="image/*"
                {...register('storylineImage', { required: !editingCharacter && 'Story line image is required' })}
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
              {errors.storylineImage && <span className="text-red-500 text-sm mt-1">{errors.storylineImage.message}</span>}
              {storylineImageURL ? (
                <div className="mt-4 w-40 h-40 overflow-hidden rounded-lg border-2 border-gray-700">
                  <img src={storylineImageURL} alt="Story Line preview" className="w-full h-full object-cover" />
                </div>
              ) : existingStoryLineImage && (
                <div className="mt-4 w-40 h-40 overflow-hidden rounded-lg border-2 border-gray-700">
                  <img src={existingStoryLineImage} alt="Current storyline" className="w-full h-full object-cover" />
                  <p className="text-sm text-gray-400 mt-1">Current image (upload a new one to change)</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Origin Fields - flat structure */}
        <div className="col-span-1 md:col-span-2 border-t border-gray-700 pt-6">
          <h2 className="text-xl font-semibold mb-3">Origin</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-1">Origin Text</label>
              <textarea
                {...register('originText', { required: 'Origin text is required' })}
                rows="4"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
              ></textarea>
              {errors.originText && <span className="text-red-500 text-sm mt-1">{errors.originText.message}</span>}
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-1">Origin Image</label>
              <input
                type="file"
                accept="image/*"
                {...register('originImage', { required: !editingCharacter && 'Origin image is required' })}
                className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
              />
              {errors.originImage && <span className="text-red-500 text-sm mt-1">{errors.originImage.message}</span>}
              {originImageURL ? (
                <div className="mt-4 w-40 h-40 overflow-hidden rounded-lg border-2 border-gray-700">
                  <img src={originImageURL} alt="Origin preview" className="w-full h-full object-cover" />
                </div>
              ) : existingOriginImage && (
                <div className="mt-4 w-40 h-40 overflow-hidden rounded-lg border-2 border-gray-700">
                  <img src={existingOriginImage} alt="Current origin" className="w-full h-full object-cover" />
                  <p className="text-sm text-gray-400 mt-1">Current image (upload a new one to change)</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2 mt-8 pt-4 border-t border-gray-700 flex gap-4">
          {editingCharacter && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 px-6 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors focus:outline-none"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="flex-1 py-3 px-6 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors focus:outline-none"
          >
            {editingCharacter ? 'Update Character' : 'Create Character'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterManager;