import '../styles/ViewStudySetUI.css';
import React, { useEffect, useState } from 'react';

const ViewStudySetUI: React.FC<{
    studySet?: {
        id: string;
        name: string;
        flashcards: { id: string; term: string; definition: string }[];
        isEditingName: boolean;
    };
    isAddingFlashcard?: boolean;
    setIsAddingFlashcard: (value: boolean) => void;
    term: string;
    setTerm: (value: string) => void;
    definition: string;
    setDefinition: (value: string) => void;
    isCardView: boolean;
    setIsCardView: (value: boolean) => void;
    handleDeleteSet: () => void;
    handleEditSetName: () => void;
    handleSaveSetName: (newName: string) => void;
    handleAddFlashcard: () => void;
    handleDeleteFlashcard: (id: string) => void;
    handleEditFlashcard: (id: string, newTerm: string, newDefinition: string) => void;
}> = ({
    studySet,
    isAddingFlashcard = false,
    setIsAddingFlashcard,
    term,
    setTerm,
    definition,
    setDefinition,
    isCardView,
    setIsCardView,
    handleDeleteSet,
    handleEditSetName,
    handleSaveSetName,
    handleAddFlashcard,
    handleDeleteFlashcard,
    handleEditFlashcard,
}) => {
    const [localStudySet, setLocalStudySet] = useState(() => studySet || null);

    useEffect(() => {
        if (!localStudySet) {
            const storedSet = localStorage.getItem('current_study_set');
            if (storedSet) {
                setLocalStudySet(JSON.parse(storedSet));
            }
        }
    }, [localStudySet]);

    if (!localStudySet) {
        return <div>Loading...</div>;
    }

    return (
        <div className="study-set-page">
            <div className="header">
                <button
                    className="home-button"
                    onClick={() => (window.location.href = '/homePage')}
                >
                    Home
                </button>
            </div>
            <div className="study-set-header">
                {localStudySet.isEditingName ? (
                    <div className="edit-set-name">
                        <input
                            type="text"
                            defaultValue={localStudySet.name}
                            onBlur={(e) => handleSaveSetName(e.target.value)}
                            autoFocus
                        />
                        <button onClick={() => handleEditSetName()}>Cancel</button>
                    </div>
                ) : (
                    <h2>{localStudySet.name}</h2>
                )}
                <div className="header-buttons">
                    <button onClick={handleEditSetName}>Edit</button>
                    <button onClick={handleDeleteSet}>Delete</button>
                </div>
            </div>
            <div className="actions">
                <button onClick={() => setIsAddingFlashcard(true)}>Add</button>
                <button onClick={() => setIsCardView(!isCardView)}>
                    {isCardView ? 'List View' : 'Card View'}
                </button>
            </div>
            {isAddingFlashcard && (
                <div className="add-flashcard">
                    <input
                        type="text"
                        placeholder="Term"
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Definition"
                        value={definition}
                        onChange={(e) => setDefinition(e.target.value)}
                    />
                    <button onClick={handleAddFlashcard}>Save</button>
                    <button onClick={() => setIsAddingFlashcard(false)}>Cancel</button>
                </div>
            )}
            <div className="flashcards">
                {localStudySet.flashcards.map((card) => (
                    <div
                        className={`flashcard ${isCardView ? 'card-view' : ''}`}
                        key={card.id}
                    >
                        {isCardView ? (
                            <div className="card">
                                <div className="card-front">{card.term}</div>
                                <div className="card-back">{card.definition}</div>
                            </div>
                        ) : (
                            <>
                                <div className="term">{card.term}</div>
                                <div className="definition">{card.definition}</div>
                                <button
                                    onClick={() =>
                                        handleEditFlashcard(
                                            card.id,
                                            prompt('Edit Term:', card.term) || card.term,
                                            prompt('Edit Definition:', card.definition) || card.definition
                                        )
                                    }
                                >
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteFlashcard(card.id)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewStudySetUI;
