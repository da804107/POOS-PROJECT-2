import '../styles/HomePageUI.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HomePageUIProps {
    studySets: { id: string; name: string; isEditing: boolean }[];
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    isAdding: boolean;
    newSetName: string;
    setNewSetName: React.Dispatch<React.SetStateAction<string>>;
    handleAddSet: () => void;
    handleSaveSet: () => void;
    handleDeleteSet: (id: string) => void;
    handleEditToggle: (id: string) => void;
    handleEditSave: (id: string, newName: string) => void;
    setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
}

const HomePageUI: React.FC<HomePageUIProps> = ({
    studySets,
    search,
    setSearch,
    isAdding,
    newSetName,
    setNewSetName,
    handleAddSet,
    handleSaveSet,
    handleDeleteSet,
    handleEditToggle,
    handleEditSave,
    setIsAdding,
}) => {
    const navigate = useNavigate();

    return (
        <div id="homepageUIDiv">
            <div id="searchBarContainer">
                <input
                    type="text"
                    id="searchText"
                    placeholder="Search Your Study Sets..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button
                    type="button"
                    id="addStudySetButton"
                    onClick={handleAddSet}
                >
                ADD SET
                </button>
            </div>

            {isAdding && (
                <div id="addNewSetDiv">
                    <input
                        type="text"
                        id="newSetNameInput"
                        placeholder="New Set Name"
                        value={newSetName}
                        onChange={e => setNewSetName(e.target.value)}
                    />
                    <div id="addNewSetButtons">
                        <button
                            className="buttons save-button"
                            onClick={handleSaveSet}
                        >
                            SAVE
                        </button>
                        <button
                            className="buttons cancel-button"
                            onClick={() => setIsAdding(false)}
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            )}
            <div id="studySetListDiv">
                <ul id="studySetList">
                    {studySets.map(set => (
                        <li key={set.id} className="studySetItem">
                            {set.isEditing ? (
                                <div className="editSetDiv">
                                    <input
                                        type="text"
                                        className="editSetInput"
                                        defaultValue={set.name}
                                        onBlur={e => handleEditSave(set.id, e.target.value)}
                                    />
                                    <button
                                        className="buttons save-button"
                                        onClick={() => handleEditSave(set.id, set.name)}
                                    >
                                        SAVE
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span className="setName">{set.name}</span>
                                    <div className="setActions">
                                        <button
                                            className="buttons view-button"
                                            onClick={() => navigate(`/studySet/${set.id}`)}
                                        >
                                            VIEW
                                        </button>
                                        <button
                                            className="buttons delete-button"
                                            onClick={() => handleDeleteSet(set.id)}
                                        >
                                            DELETE
                                        </button>
                                        <button
                                            className="buttons edit-button"
                                            onClick={() => handleEditToggle(set.id)}
                                        >
                                            EDIT
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default HomePageUI;
