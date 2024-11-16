import '../styles/NewStudySetUI.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TextareaPair {
  id: number;
  textarea1: string;
  textarea2: string;
}

function NewStudySetUI() {
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

  const handleSaveChanges = () => {
    // Here you can handle saving the title and flashcards, e.g., sending to a server or local storage.
    console.log('Saving Study Set...');
    console.log('Title:', title);
    console.log('Flashcards:', textareasList);
    navigate('/studySets');
  };

  return (
    <div>
      {/* Title Input Field */}
      <div className="center-text">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
          placeholder="Enter Study Set Title"
          aria-label="Study Set Title"
        />
      </div>

      {/* Add Flashcards Button */}
      <button
        className="add-flash-card-button"
        onClick={addTextareas}
        aria-label="Add New Flash Card"
      >
        ADD NEW FLASH CARD
      </button>

      {/* Flashcards */}
      <div>
        {textareasList.map((pair, index) => (
          <div key={pair.id} className="center-text">
            <div className="large-square2">
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
          </div>
        ))}
      </div>

      {/* Save Changes Button */}
      <div className="center-text">
        <button
          className="save-changes-button"
          onClick={handleSaveChanges}
          aria-label="Save Study Set"
        >
          SAVE STUDY SET
        </button>
      </div>
    </div>
  );
}

export default NewStudySetUI;
