import '../styles/ViewStudySetUI.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TextareaPair {
  id: number;
  textarea1: string;
  textarea2: string;
}

function ViewStudySetUI() {
  let _ud: any = localStorage.getItem('user_data');
  let ud = _ud ? JSON.parse(_ud) : null;
  let userId: string = ud?.id || 'defaultUserId'; // Fallback for testing

  const [message, setMessage] = React.useState('');
  const [title, setTitle] = useState('');
  const [textareasList, setTextareasList] = useState<TextareaPair[]>([]);
  const navigate = useNavigate();

  // Load data from localStorage on mount
  useEffect(() => {
    const storedStudySet = JSON.parse(localStorage.getItem('current_study_set') || '{}');
    if (storedStudySet.title) {
      setTitle(storedStudySet.title);
      setTextareasList(storedStudySet.flashcards || []);
    }
  }, []);

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

  async function handleSaveChanges(event: any): Promise<void> {
    event.preventDefault();

    console.log('Saving Study Set...');
    console.log('Title:', title);
    console.log('Flashcards:', textareasList);

    const studySet = { userId, title, textareasList };

    // Save to localStorage
    localStorage.setItem('current_study_set', JSON.stringify(studySet));

    // Simulate API call
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(studySet),
    };

    try {
      const response = await fetch('http://localhost:5000/api/addset', requestOptions);

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Addset failed');
      }

      const res = await response.json();
      setMessage('Set saved successfully!');
      setTimeout(() => navigate('/HomePage'), 2000);
    } catch (error: any) {
      console.error('Error during save:', error);
      setMessage(error.message || 'Failed to save set. Please try again.');
    }
  }

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

      {/* Display Message */}
      {message && <div className="message">{message}</div>}
    </div>
  );
}

export default ViewStudySetUI;
