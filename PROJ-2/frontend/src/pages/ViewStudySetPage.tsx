import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import ViewStudySetUI from '../components/ViewStudySetUI';

const ViewStudySetPage = async () => {
    let _ud: any = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let Id: string = ud.id;
    
    let _sn: any = localStorage.getItem('set_name');
    let sn = JSON.parse(_sn);
    let setName = sn.name;
    
    const { id } = useParams();

    const userId = Id;
            console.log("Loading sets");
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, setName }),
            };
            try {
                console.log(userId);
            const response = await fetch('https://project.annetteisabrunette.xyz/api/viewset', requestOptions);
            const fetchedSet = await response.json();
            console.log(fetchedSet);

            if (!response.ok) {
                throw new Error('Failed to fetch sets');
            }


            console.log("Fetched no errors");
                
            } catch (error) {
                console.error('Failed to load sets', error);
            }

    const initialStudySet = {
        id: id || '',
        name: sn.name,
        flashcards: fetchedSet,
        isEditingName: false,
    };

    const [studySet, setStudySet] = useState(initialStudySet);
    const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
    const [isCardView, setIsCardView] = useState(false);
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');

    const handleEditSetName = () => {
        setStudySet({ ...studySet, isEditingName: !studySet.isEditingName });
    };

    const handleSaveSetName = (newName: string) => {
        setStudySet({ ...studySet, name: newName, isEditingName: false });
    };

    const handleDeleteSet = () => {
        console.log('Study set deleted:', studySet.id);
    };

    const handleAddFlashcard = () => {
        const newFlashcard = {
            id: Date.now().toString(),
            term,
            definition,
        };
        setStudySet({
            ...studySet,
            flashcards: [...studySet.flashcards, newFlashcard],
        });
        setTerm('');
        setDefinition('');
        setIsAddingFlashcard(false);
    };

    const handleDeleteFlashcard = (flashcardId: string) => {
        setStudySet({
            ...studySet,
            flashcards: studySet.flashcards.filter(
                (flashcard) => flashcard.id !== flashcardId
            ),
        });
    };

    const handleEditFlashcard = (flashcardId: string, newTerm: string, newDefinition: string) => {
        setStudySet({
            ...studySet,
            flashcards: studySet.flashcards.map((flashcard) =>
                flashcard.id === flashcardId
                    ? { ...flashcard, term: newTerm, definition: newDefinition }
                    : flashcard
            ),
        });
    };

    useEffect(() => {
        console.log('Fetching study set for ID:', id);
    }, [id]);

    return (
        <div>
            <PageTitle />
            <ViewStudySetUI
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

export default ViewStudySetPage;
