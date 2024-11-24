import React, { useEffect, useState } from 'react';
import '../styles/ViewStudySetUI.css';

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
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

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

    const currentCard = localStudySet.flashcards[currentIndex];

    const handleNextCard = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) => (prev + 1) % localStudySet.flashcards.length);
    };

    const handlePreviousCard = () => {
        setIsFlipped(false);
        setCurrentIndex((prev) =>
            (prev - 1 + localStudySet.flashcards.length) % localStudySet.flashcards.length
        );
    };

    return (
        <div className="study-set-page">
            <div className="header">
                <button
                    className="home-button"
                    onClick={() => (window.location.href = '/homePage')}
                >
                    HOME
                </button>
            </div>
            <div className="study-set-header">
                <h2>{localStudySet.name}</h2>
            </div>
            <div className="actions">
                <button onClick={() => setIsAddingFlashcard(true)}>ADD</button>
                <button onClick={() => setIsCardView(!isCardView)}>
                    {isCardView ? 'LIST VIEW' : 'CARD VIEW'}
                </button>
            </div>
            {isCardView && currentCard ? (
                <div>
                    <div
                        className={`card ${isFlipped ? 'flipped' : ''}`}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        <div className="card-inner">
                            <div className="card-front">{currentCard.term}</div>
                            <div className="card-back">{currentCard.definition}</div>
                        </div>
                    </div>
                    <div className="card-buttons">
                        <button onClick={handlePreviousCard}>PREVIOUS</button>
                        <button onClick={handleNextCard}>NEXT</button>
                    </div>
                </div>
            ) : (
                <div className="flashcards">
                    {localStudySet.flashcards.map((card) => (
                        <div className="flashcard" key={card.id}>
                            <div className="term">{card.term}</div>
                            <div className="definition">{card.definition}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewStudySetUI;
