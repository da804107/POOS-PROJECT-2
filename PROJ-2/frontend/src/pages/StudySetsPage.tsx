import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import StudySetsPageUI from '../components/StudySetsPageUI';
import React, { useState } from 'react';

const StudySetsPage: React.FC<{ studySetId: string }> = ({ studySetId }) => {
    const [studySet, setStudySet] = useState({
        id: studySetId,
        name: 'Sample Study Set',
        flashcards: [
            { id: '1', term: 'Example Term 1', definition: 'Example Definition 1' },
            { id: '2', term: 'Example Term 2', definition: 'Example Definition 2' },
        ],
        isEditingName: false,
    });
    const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');
    const [isCardView, setIsCardView] = useState(false);

    const handleDeleteSet = () => {
        // Simulate deleting the study set and navigate back to HomePage
        window.location.href = '/';
    };

    const handleEditSetName = () => {
        setStudySet(prev => ({ ...prev, isEditingName: !prev.isEditingName }));
    };

    const handleSaveSetName = (newName: string) => {
        setStudySet(prev => ({ ...prev, name: newName, isEditingName: false }));
    };

    const handleAddFlashcard = () => {
        if (term.trim() && definition.trim()) {
            const newCard = { id: Date.now().toString(), term, definition };
            setStudySet(prev => ({
                ...prev,
                flashcards: [...prev.flashcards, newCard],
            }));
            setTerm('');
            setDefinition('');
            setIsAddingFlashcard(false);
        }
    };

    const handleDeleteFlashcard = (id: string) => {
        setStudySet(prev => ({
            ...prev,
            flashcards: prev.flashcards.filter(card => card.id !== id),
        }));
    };

    const handleEditFlashcard = (id: string, newTerm: string, newDefinition: string) => {
        setStudySet(prev => ({
            ...prev,
            flashcards: prev.flashcards.map(card =>
                card.id === id ? { ...card, term: newTerm, definition: newDefinition } : card
            ),
        }));
    };

    return (
        <div>
            <PageTitle />
            <StudySetsPageUI
                studySet={studySet}
                isAddingFlashcard={isAddingFlashcard}
                setIsAddingFlashcard={setIsAddingFlashcard}
                term={term}
                setTerm={setTerm}
                definition={definition}
                setDefinition={setDefinition}
                isCardView={isCardView}
                setIsCardView={setIsCardView}
                handleDeleteSet={handleDeleteSet}
                handleEditSetName={handleEditSetName}
                handleSaveSetName={handleSaveSetName}
                handleAddFlashcard={handleAddFlashcard}
                handleDeleteFlashcard={handleDeleteFlashcard}
                handleEditFlashcard={handleEditFlashcard}
            />
        </div>
    );
};

export default StudySetsPage;
