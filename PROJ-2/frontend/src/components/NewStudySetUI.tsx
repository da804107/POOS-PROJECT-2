import '../styles/NewStudySetUI.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TextareaPair {
  id: number;
  textarea1: string;
  textarea2: string;
}

function NewStudySetUI() {
  const [message, setMessage] = React.useState('');
  const [title, setTitle] = useState(''); // State for the title
  const [textareasList, setTextareasList] = useState<TextareaPair[]>([]);
  const navigate = useNavigate();

  const addTextareas = () => {
    const newTextareaPair: TextareaPair = {
      id: Date.now(),
      textarea1: '',
      textarea2: '',
    };
    setTextareasList((prev) => [...prev, newTextareaPair]);
  };

  const handleTextareaChange = (
    index: number,
    field: 'textarea1' | 'textarea2',
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const updatedList = [...textareasList];
    updatedList[index][field] = event.target.value;
    setTextareasList(updatedList);
  };

  const autoResize = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  async function handleSaveChanges(event: any) : Promise < void > {
  event.preventDefault();
    // Handle saving the title and flashcards, e.g., sending to a server or local storage.
    console.log('Saving Study Set...');
    console.log('Title:', title);
    console.log('Flashcards:', textareasList);

    const studySet = { setTitle };
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(studySet),
        };
    
        try {
            const response = await fetch('https://project.annetteisabrunette.xyz/api/addset', requestOptions);
    
            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Addset failed');
            }
    
            const res = await response.json();
            setMessage('Set added Successfully!');
            setTimeout(() => navigate('/studySets'), 2000);
        } catch (error: any) {
            console.error('Error during add set:', error);
            setMessage(error.message || 'Failed to add set. Please try again.');
        }
    
    //navigate('/studySets');
  };

  return (
    <div className="study-set-container">
      {/* Title Input Field */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="title-input"
        placeholder="Enter Study Set Title"
        aria-label="Study Set Title"
      />

      {/* Add Flashcards Button */}
      <button
        className="add-flash-card-button"
        onClick={addTextareas}
        aria-label="Add New Flash Card"
      >
        ADD NEW FLASHCARD
      </button>

      {/* Flashcards (Scrollable Section) */}
      <div className="flashcards-container">
        {textareasList.map((pair, index) => (
          <div key={pair.id} className="flashcard">
            <textarea
              value={pair.textarea1}
              onChange={(e) => handleTextareaChange(index, 'textarea1', e)}
              onInput={autoResize}
              className="input-bar-term"
              placeholder="Enter Term"
              aria-label="Enter Term"
            />
            <textarea
              value={pair.textarea2}
              onChange={(e) => handleTextareaChange(index, 'textarea2', e)}
              onInput={autoResize}
              className="input-bar-def"
              placeholder="Enter Definition"
              aria-label="Enter Definition"
            />
          </div>
      ))}
    </div>

      {/* Save Changes Button */}
      <button
        className="save-changes-button"
        onClick={handleSaveChanges}
        aria-label="Save Study Set"
      >
        SAVE STUDY SET
      </button>
    </div>
  );
}

export default NewStudySetUI;
