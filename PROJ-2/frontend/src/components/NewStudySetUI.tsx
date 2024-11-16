import '../styles/NewStudySetUI.css';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';

function NewStudySetUI() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [textareasList, setTextareasList] = useState([]);

  // Refs for each textarea element
  const textareaRef1 = useRef(null);
  const textareaRef2 = useRef(null);

  // Handle text changes for each textarea
  const handleChange1 = (event) => {
    setText1(event.target.value);
  };

  const handleChange2 = (event) => {
    setText2(event.target.value);
  };

  // Adjust height of each textarea based on content
  const adjustHeight = (textarea) => {
    if (textarea) {
      // Reset height to auto to shrink when content is removed
      textarea.style.height = 'auto';

      // Get the number of lines
      const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
      const lines = Math.floor(textarea.scrollHeight / lineHeight);

      // Set the height to be at least as tall as the content with full lines
      textarea.style.height = `${lines * lineHeight}px`;
    }
  };

  // Effect hook to adjust heights when the text changes
  useEffect(() => {
    adjustHeight(textareaRef1.current);
    adjustHeight(textareaRef2.current);
  }, [text1, text2]); // Runs whenever text1 or text2 changes

  const addTextareas = () => {
    const newTextareaPair = {
      id: Date.now(), // Unique ID for each pair
      textarea1: '',  // Initial value for the first textarea
      textarea2: '',  // Initial value for the second textarea
    };
    setTextareasList((prev) => [...prev, newTextareaPair]);
  };

  const handleTextareaChange1 = (index, textareaNumber, event) => {
    const updatedTextareas = [...textareasList];
    updatedTextareas[index][textareaNumber] = event.target.value;
    setTextareasList(updatedTextareas);
  };

  const handleTextareaChange2 = (index, textareaNumber, event) => {
    const updatedTextareas = [...textareasList];
    updatedTextareas[index][textareaNumber] = event.target.value;
    setTextareasList(updatedTextareas);
  };

  const autoResize = (event) => {
    // Set the height to 'auto' to shrink the textarea back when necessary
    event.target.style.height = 'auto';
    
    // Set the height to the scrollHeight, which is the full content height
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  return (
    <html>
      <head></head>
      <body>

        <button class="add-flash-card-button" onClick={addTextareas}>Add New Flash Card</button>

        <div>
          {textareasList.map((pair, index) => (
            <div key={pair.id} className="center-text">
              <div class="large-square2">
                <textarea
                  ref={textareaRef1}
                  value={pair.textarea1}
                  onChange={(e) => { 
                    handleTextareaChange1(index, 'textarea1', e);  // Call first function
                  }}
                  onInput={autoResize}
                  className="input-bar-term"
                  placeholder="Enter Term"
                />
                <textarea
                  ref={textareaRef1}
                  value={pair.textarea2}
                  onChange={(e) => { 
                    handleTextareaChange2(index, 'textarea2', e);  // Call first function
                  }}
                  onInput={autoResize}
                  className="input-bar-def"
                  placeholder="Enter Definition"
                />
              </div>
            </div>
          ))}
        </div>

      </body>
    </html>
  );
}

export default NewStudySetUI;