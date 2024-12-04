/*import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import ViewStudySetUI from '../components/ViewStudySetUI';

const ViewStudySetPage = () => {
    let _ud: any = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let Id: string = ud.id;
    
    let _sn: any = localStorage.getItem('set_name');
    let sn = JSON.parse(_sn);
    let setName = sn.name;

    
    useEffect(() => {
        const handleLoad = async () => {
    //const { id } = useParams();

    const userId = Id;
            console.log("Loading sets");
    
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId, setName: setName }),
            };
            try {
                console.log(requestOptions.body);
            const response = await fetch('https://project.annetteisabrunette.xyz/api/viewset', requestOptions);
            const fetchedSet = await response.json();
            console.log(fetchedSet);

            if (!response.ok) {
                throw new Error('Failed to fetch sets');
            }

            setStudySet(fetchedSet);
            console.log("Fetched no errors");
                
            } catch (error) {
                console.error('Failed to load sets', error);
            }
            };

        if (Id) {
            handleLoad();
        }
    }, [Id]);

    const initialStudySet = {
        id: Id || '',
        name: sn.name,
        flashcards: [
            { id: '1', term: 'Oh', definition: 'I see' },
            { id: '2', term: 'Dang', definition: 'it' },
        ],
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
        console.log('Fetching study set for ID:', Id);
    }, [Id]);

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

export default ViewStudySetPage;*/

import { useState, useEffect } from 'react';
import PageTitle from '../components/PageTitle';
import ViewStudySetUI from '../components/ViewStudySetUI';

const ViewStudySetPage = () => {
    // Retrieve user and study set details from localStorage
    const userData = JSON.parse(localStorage.getItem('user_data') || '{}');
    const setNameData = JSON.parse(localStorage.getItem('set_name') || '{}');
    const userId = userData.id;
    const setName = setNameData.name;

    const [studySet, setStudySet] = useState({
        id: '',
        name: '',
        flashcards: [],
        isEditingName: false,
    });

    const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');
    const [isCardView, setIsCardView] = useState(false);

    // Load the study set from the server on component mount
    useEffect(() => {
        const loadStudySet = async () => {
            try {
                const response = await fetch('https://your-backend-url/api/viewset', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId, setName }),
                });
                if (!response.ok) {
                    throw new Error('Failed to load study set');
                }
                const data = await response.json();
                setStudySet(data);
            } catch (error) {
                console.error('Error loading study set:', error);
            }
        };

        if (userId && setName) {
            loadStudySet();
        }
    }, [userId, setName]);

    // Add a flashcard to the study set
    const handleAddFlashcard = async () => {
        const newFlashcard = { id: Date.now().toString(), term, definition };

        try {
            const response = await fetch('https://your-backend-url/api/addflashcard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studySetId: studySet.id, flashcard: newFlashcard }),
            });
            if (!response.ok) {
                throw new Error('Failed to add flashcard');
            }
            setStudySet((prev) => ({
                ...prev,
                flashcards: [...prev.flashcards, newFlashcard],
            }));
            setTerm('');
            setDefinition('');
            setIsAddingFlashcard(false);
        } catch (error) {
            console.error('Error adding flashcard:', error);
        }
    };

    // Delete a flashcard from the study set
    const handleDeleteFlashcard = async (flashcardId: string) => {
        try {
            const response = await fetch('https://your-backend-url/api/deleteflashcard', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studySetId: studySet.id, flashcardId }),
            });
            if (!response.ok) {
                throw new Error('Failed to delete flashcard');
            }
            setStudySet((prev) => ({
                ...prev,
                flashcards: prev.flashcards.filter((flashcard) => flashcard.id !== flashcardId),
            }));
        } catch (error) {
            console.error('Error deleting flashcard:', error);
        }
    };

    // Edit a flashcard in the study set
    const handleEditFlashcard = async (flashcardId: string, newTerm: string, newDefinition: string) => {
        try {
            const response = await fetch('https://your-backend-url/api/editflashcard', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studySetId: studySet.id,
                    flashcardId,
                    updatedFlashcard: { term: newTerm, definition: newDefinition },
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to edit flashcard');
            }
            setStudySet((prev) => ({
                ...prev,
                flashcards: prev.flashcards.map((flashcard) =>
                    flashcard.id === flashcardId
                        ? { ...flashcard, term: newTerm, definition: newDefinition }
                        : flashcard
                ),
            }));
        } catch (error) {
            console.error('Error editing flashcard:', error);
        }
    };

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
                handleDeleteSet={() => console.log('Delete set not implemented')}
                handleEditSetName={(newName: string) =>
                    setStudySet((prev) => ({ ...prev, name: newName }))
                }
                handleAddFlashcard={handleAddFlashcard}
                handleDeleteFlashcard={handleDeleteFlashcard}
                handleEditFlashcard={handleEditFlashcard}
            />
        </div>
    );
};

export default ViewStudySetPage;
