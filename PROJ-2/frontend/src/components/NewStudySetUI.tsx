import '../styles/NewStudySetUI.css';
import React, { useState } from 'react';

interface TextareaPair {
  id: number;
  textarea1: string;
  textarea2: string;
}

function NewStudySetUI() {
  const [textareasList, setTextareasList] = useState<TextareaPair[]>([]);

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

  return (
    <div>
      <button
        className="add-flash-card-button"
        onClick={addTextareas}
        aria-label="Add New Flash Card"
      >
        Add New Flash Card
      </button>

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
    </div>
  );
}

export default NewStudySetUI;
