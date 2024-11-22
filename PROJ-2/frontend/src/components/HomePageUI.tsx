import '../styles/HomePageUI.css';
import { useState } from 'react';
import React from 'react';

const HomePageUI: React.FC<{
    studySets: {
        id: string;
        name: string;
        isEditing: boolean;
    }[];
    search: string;
    setSearch: (value: string) => void;
    isAdding: boolean;
    newSetName: string;
    setNewSetName: (value: string) => void;
    handleAddSet: () => void;
    handleSaveSet: () => void;
    handleDeleteSet: (id: string) => void;
    handleEditToggle: (id: string) => void;
    handleEditSave: (id: string, newName: string) => void;
    setIsAdding: (value: boolean) => void;
}> = ({
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
        const [editingText, setEditingText] = useState<string>('');

        return (
            <div className="homepage">
                <div className="center-text">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <button className="add-button" onClick={handleAddSet}>
                        Add Set
                    </button>
                    {isAdding && (
                        <div className="new-set">
                            <input
                                type="text"
                                placeholder="New set name"
                                value={newSetName}
                                onChange={e => setNewSetName(e.target.value)}
                            />
                            <button className="save-button" onClick={handleSaveSet}>Save</button>
                            <button className="cancel-button" onClick={() => setIsAdding(false)}>Cancel</button>
                        </div>
                    )}
                    <div className="small-square">
                        <ul className="study-sets-list">
                            {studySets.map(set => (
                                <li key={set.id}>
                                    {set.isEditing ? (
                                        <div className="edit-set">
                                            <input
                                                type="text"
                                                value={editingText}
                                                onChange={e => setEditingText(e.target.value)}
                                                autoFocus
                                            />
                                            <button className="save-button" onClick={() => handleEditSave(set.id, editingText)}>Save</button>
                                            <button className="cancel-button" onClick={() => handleEditToggle(set.id)}>Cancel</button>
                                        </div>
                                    ) : (
                                        <>
                                            <a href={`/studySets/${set.id}`} className="set-name">
                                                {set.name}
                                            </a>
                                            <div className="right">
                                                <button onClick={() => {
                                                    setEditingText(set.name);
                                                    handleEditToggle(set.id);
                                                }}>
                                                    Edit
                                                </button>
                                                <button className="delete-button" onClick={() => handleDeleteSet(set.id)}>Delete</button>
                                            </div>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

export default HomePageUI;
