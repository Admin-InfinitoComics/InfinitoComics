// src/components/characters/formConfig.js

// Form field configuration
export const formFields = [
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

// Helper function to clean character data
export const cleanCharacterData = (character) => {
  const cleanCharacter = { ...character };
  
  // Explicitly remove any storyLine or origin keys if they exist
  if (cleanCharacter.storyLine) delete cleanCharacter.storyLine;
  if (cleanCharacter.origin) delete cleanCharacter.origin;
  
  return cleanCharacter;
};