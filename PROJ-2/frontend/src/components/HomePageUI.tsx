import '../styles/HomePageUI.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePageUI() {
    const [search, setSearch] = useState('');
    const [studySets, setStudySets] = useState([
        { id: '1', name: 'Math Basics' },
        { id: '2', name: 'History Facts' },
    ]); // Example data
    const [newSetName, setNewSetName] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    function addStudySet() {
        setIsAdding(true);
    }

    function saveNewSet() {
        if (newSetName.trim() !== '') {
            const newSet = {
                id: `${Date.now()}`,
                name: newSetName,
            };
            setStudySets([...studySets, newSet]);
            setNewSetName('');
            setIsAdding(false);
        }
    }

    function cancelAddSet() {
        setNewSetName('');
        setIsAdding(false);
    }

    function deleteSet(id: string) {
        setStudySets(studySets.filter(set => set.id !== id));
    }

    function handleSearchTextChange(e: any): void {
        setSearch(e.target.value);
    }

    return (
        <div id="homepageUIDiv">
            <input
                type="text"
                id="searchText"
                placeholder="Search Your Study Sets..."
                value={search}
                onChange={handleSearchTextChange}
            />
            <div id="home-button-container">
                <button
                    type="button"
                    id="addStudySetButton"
                    onClick={addStudySet}
                >
                    ADD SET
                </button>
            </div>
            {isAdding && (
                <div id="addNewSetDiv">
                    <input
                        type="text"
                        id="newSetNameInput"
                        placeholder="New set name"
                        value={newSetName}
                        onChange={e => setNewSetName(e.target.value)}
                    />
                    <div id="addNewSetButtons">
                        <button
                            className="buttons save-button"
                            onClick={saveNewSet}
                        >
                            SAVE
                        </button>
                        <button
                            className="buttons cancel-button"
                            onClick={cancelAddSet}
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            )}
            <div id="studySetListDiv">
                <ul id="studySetList">
                    {studySets
                        .filter(set => set.name.toLowerCase().includes(search.toLowerCase()))
                        .map(set => (
                            <li key={set.id} className="studySetItem">
                                <span className="setName">{set.name}</span>
                                <div className="setActions">
                                    <button
                                        className="buttons view-button"
                                        onClick={() => navigate(`/newStudySet/${set.id}`)}
                                    >
                                        VIEW
                                    </button>
                                    <button
                                        className="buttons delete-button"
                                        onClick={() => deleteSet(set.id)}
                                    >
                                        DELETE
                                    </button>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default HomePageUI;
