// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import PageTitle from "../components/PageTitle";
// import ViewStudySetUI from "../components/ViewStudySetUI";

// const ViewStudySetPage = () => {
//   let _ud: any = localStorage.getItem("user_data");
//   let ud = JSON.parse(_ud);
//   let Id: string = ud.id;

//   let _sn: any = localStorage.getItem("set_name");
//   let sn = JSON.parse(_sn);
//   let setName = sn.name;

//   useEffect(() => {
//     const handleLoad = async () => {
//     const userId = Id;
//     console.log("Loading sets");

//     const requestOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: userId, setName: setName }),
//     };
//     try {
//         console.log(requestOptions.body);
//         const response = await fetch(
//             "https://project.annetteisabrunette.xyz/api/viewset",
//             requestOptions
//         );
//         const fetchedSet = await response.json();
//         console.log(fetchedSet);

//         if (!response.ok) {
//             throw new Error("Failed to fetch sets");
//         }
//         if (fetchedSet.results) {
//             console.log(fetchedSet.results.flashcards);
//             setStudySet(fetchedSet.results);
//             console.log(fetchedSet.results.flashcards);
//             console.log("Fetched no errors");
//         }
//     } catch (error) {
//         console.error("Failed to load sets", error);
//     }
//     };


//     if (Id) {
//       handleLoad();
//     }
//     }, [Id]);

//   const initialStudySet = {
//     id: Id || "",
//     name: sn.name,
//     flashcards: [
//       { id: "1", term: "Oh", definition: "I see" },
//       { id: "2", term: "Dang", definition: "it" },
//     ],
//     isEditingName: false,
//   };

//   interface Flashcard {
//     id: string;
//     term: string;
//     definition: string;
//   }

//   interface StudySet {
//     id: string;
//     name: string;
//     flashcards: Flashcard[];
//     isEditingName: boolean;
//   }

//   const [studySet, setStudySet] = useState<StudySet>({
//     id: "",
//     name: "",
//     flashcards: [],
//     isEditingName: false,
//   });
//   const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
//   const [isCardView, setIsCardView] = useState(false);
//   const [term, setTerm] = useState("");
//   const [definition, setDefinition] = useState("");

//   const handleEditSetName = () => {
//     setStudySet({ ...studySet, isEditingName: !studySet.isEditingName });
//   };

//   const handleSaveSetName = async (newName: string) => {
//     try {
//         const requestOptions = {
//             method: 'POST', // Changed from 'PATCH' to 'POST'
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 userId: Id,
//                 setId: studySet.id,
//                 newName: newName,
//             }),
//         };

//         const response = await fetch('https://project.annetteisabrunette.xyz/api/setName', requestOptions);

//         const result = await response.json();

//         if (!response.ok) {
//             throw new Error(result.error || 'Error updating set name');
//         }

//         // Fetch the updated study set to ensure 'id' is retained
//         const viewSetResponse = await fetch(
//             "https://project.annetteisabrunette.xyz/api/viewset",
//             {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ userId: Id, setName: newName }),
//             }
//         );

//         const updatedSet = await viewSetResponse.json();

//         if (!viewSetResponse.ok) {
//             throw new Error('Error fetching updated set');
//         }

//         setStudySet(updatedSet.results);
//     } catch (error) {
//         console.error('Failed to save set name:', error);
//     }
//     };

//   const handleDeleteSet = async () => {
//     try {
//         const requestOptions = {
//             method: 'POST', // Changed from 'DELETE' to 'POST'
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 userId: Id,
//                 title: studySet.name,
//             }),
//         };

//         const response = await fetch('https://project.annetteisabrunette.xyz/api/deleteset', requestOptions);

//         const result = await response.json();

//         if (!response.ok) {
//             throw new Error(result.message || 'Error deleting set');
//         }

//         // Redirect or update UI after deletion
//         window.location.href = '/sets';
//     } catch (error) {
//         console.error('Failed to delete set:', error);
//     }
//   };

// const handleAddFlashcard = async () => {
//     const newFlashcard: Flashcard = {
//         id: Date.now().toString(),
//         term,
//         definition,
//     };

//     try {
//         const requestOptions = {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 userId: Id,
//                 setName: setName,
//                 flashcard: newFlashcard,
//             }),
//         };

//         console.log(newFlashcard);
//         console.log(Id);
//         console.log(setName);
//         const response = await fetch('https://project.annetteisabrunette.xyz/api/addflashcard', requestOptions);

//         if (!response.ok) {
//             const errorResponse = await response.json();
//             throw new Error(errorResponse.error || 'Error adding flashcard');
//         }


//         const updatedSetResponse = await fetch(
//             'https://project.annetteisabrunette.xyz/api/viewset',
//             {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ userId: Id, setName: setName }),
//             }
//         );

//         const updatedSet = await updatedSetResponse.json();
//         if (updatedSet.results) {
//             setStudySet(updatedSet.results);
//         }

//         setTerm('');
//         setDefinition('');
//         setIsAddingFlashcard(false);

//     } catch (error) {
//         console.error('Failed to add flashcard:', error);
//     }
// };

// const handleDeleteFlashcard = async (flashcardId: string) => {
//     try {
//         const requestOptions = {
//             method: 'POST', // Changed from 'DELETE' to 'POST'
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 userId: Id,
//                 setName: studySet.name,
//                 flashcardId: flashcardId,
//             }),
//         };

//         const response = await fetch('https://project.annetteisabrunette.xyz/api/deleteflashcard', requestOptions);

//         const result = await response.json();

//         if (!response.ok) {
//             throw new Error(result.error || 'Error deleting flashcard');
//         }

//         setStudySet({
//             ...studySet,
//             flashcards: studySet.flashcards.filter(
//                 (flashcard) => flashcard.id !== flashcardId
//             ),
//         });
//     } catch (error) {
//         console.error('Failed to delete flashcard:', error);
//     }
// };


// const handleEditFlashcard = async (
//     flashcardId: string,
//     newTerm: string,
//     newDefinition: string
// ) => {
//     try {
//         const requestOptions = {
//             method: 'POST', // Changed from 'PATCH' to 'POST'
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 userId: Id,
//                 setName: studySet.name,
//                 flashcardId: flashcardId,
//                 newTerm: newTerm,
//                 newDefinition: newDefinition,
//             }),
//         };

//         const response = await fetch('https://project.annetteisabrunette.xyz/api/editflashcard', requestOptions);

//         const result = await response.json();

//         if (!response.ok) {
//             throw new Error(result.error || 'Error editing flashcard');
//         }

//         setStudySet({
//             ...studySet,
//             flashcards: studySet.flashcards.map((flashcard) =>
//                 flashcard.id === flashcardId
//                     ? { ...flashcard, term: newTerm, definition: newDefinition }
//                     : flashcard
//             ),
//         });
//     } catch (error) {
//         console.error('Failed to edit flashcard:', error);
//     }
// };


//   useEffect(() => {
//     console.log("Fetching study set for ID:", Id);
//   }, [Id]);

//   return (
//     <div>
//       <PageTitle />
//       <ViewStudySetUI
//         studySet={studySet}
//         isAddingFlashcard={isAddingFlashcard}
//         setIsAddingFlashcard={setIsAddingFlashcard}
//         term={term}
//         setTerm={setTerm}
//         definition={definition}
//         setDefinition={setDefinition}
//         isCardView={isCardView}
//         setIsCardView={setIsCardView}
//         handleDeleteSet={handleDeleteSet}
//         handleEditSetName={handleEditSetName}
//         handleSaveSetName={handleSaveSetName}
//         handleAddFlashcard={handleAddFlashcard}
//         handleDeleteFlashcard={handleDeleteFlashcard}
//         handleEditFlashcard={handleEditFlashcard}
//       />
//     </div>
//   );
// };

// export default ViewStudySetPage;

// src/components/ViewStudySetUI.tsx


// src/pages/ViewStudySetPage.tsx

// src/pages/ViewStudySetPage.tsx

import React, { useState, useEffect } from 'react';
import './viewstudysetui.css'; // Ensure you import your CSS file
import { useParams } from 'react-router-dom';

interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

interface StudySet {
  id: string;
  name: string;
  flashcards: Flashcard[];
  isEditingName: boolean;
}

interface ViewStudySetUIProps {
  studySet: StudySet;
  isAddingFlashcard: boolean;
  newFlashcard: { term: string; definition: string };
  setNewFlashcard: React.Dispatch<React.SetStateAction<{ term: string; definition: string }>>;
  handleAddFlashcard: () => void;
  handleDeleteSet: () => void;
  handleEditSetName: (newName: string) => void; // Updated type
  handleEditFlashcard: (id: string, newTerm: string, newDefinition: string) => void;
  setIsAddingFlashcard: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewStudySetPage: React.FC = () => {
  const { id: setId } = useParams<{ id: string }>();
  const [studySet, setStudySet] = useState<StudySet | null>(null);
  const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({ term: '', definition: '' });

  const userData = localStorage.getItem('user_data');
  const userId = userData ? JSON.parse(userData).id : '';

  useEffect(() => {
    const fetchStudySet = async () => {
      try {
        const response = await fetch('https://project.annetteisabrunette.xyz/api/getStudySet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, setId }),
        });

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error || 'Failed to fetch study set');
        }

        const data = await response.json();
        setStudySet({
          id: data.setId,
          name: data.title,
          flashcards: data.flashcards || [],
          isEditingName: false,
        });
      } catch (error) {
        console.error('Error fetching study set:', error);
      }
    };

    if (userId && setId) {
      fetchStudySet();
    }
  }, [userId, setId]);

  const handleEditSetName = (newName: string) => {
    if (studySet) {
      const updateSetName = async () => {
        try {
          const response = await fetch('https://project.annetteisabrunette.xyz/api/updateSetName', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId,
              setId: studySet.id,
              newName,
            }),
          });

          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Error updating set name');
          }

          setStudySet({ ...studySet, name: newName, isEditingName: false });
        } catch (error) {
          console.error('Failed to update set name:', error);
        }
      };

      updateSetName();
    }
  };

  // Placeholder functions for other handlers
  const handleAddFlashcard = () => {};
  const handleEditFlashcard = (id: string, newTerm: string, newDefinition: string) => {};
  const handleDeleteSet = async () => {
    // Your delete set logic
  };

  return (
    <div>
      {studySet && (
        <ViewStudySetUI
          studySet={studySet}
          isAddingFlashcard={isAddingFlashcard}
          newFlashcard={newFlashcard}
          setNewFlashcard={setNewFlashcard}
          handleAddFlashcard={handleAddFlashcard}
          handleDeleteSet={handleDeleteSet}
          handleEditSetName={handleEditSetName}
          handleEditFlashcard={handleEditFlashcard}
          setIsAddingFlashcard={setIsAddingFlashcard}
        />
      )}
    </div>
  );
};

// ViewStudySetUI component
const ViewStudySetUI: React.FC<ViewStudySetUIProps> = ({
  studySet,
  isAddingFlashcard,
  newFlashcard,
  setNewFlashcard,
  handleAddFlashcard,
  handleDeleteSet,
  handleEditSetName,
  handleEditFlashcard,
  setIsAddingFlashcard,
}) => {
  const [newName, setNewName] = useState(studySet.name);

  return (
    <div className="study-set-page">
      <button className="home-button" onClick={() => (window.location.href = '/homePage')}>
        Home
      </button>

      <div className="study-set-header">
        {studySet.isEditingName ? (
          <div className="edit-set-name">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={() => handleEditSetName(newName)}>Save</button>
          </div>
        ) : (
          <h2>{studySet.name}</h2>
        )}
      </div>

      <div className="actions">
        <button onClick={() => setIsAddingFlashcard(true)}>Add Flashcard</button>
        <button onClick={handleDeleteSet}>Delete Set</button>
        <button onClick={() => studySet.isEditingName = true}>Edit Set Name</button>
      </div>

      {isAddingFlashcard && (
        <div className="add-flashcard">
          <input
            type="text"
            placeholder="Term"
            value={newFlashcard.term}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, term: e.target.value })}
          />
          <input
            type="text"
            placeholder="Definition"
            value={newFlashcard.definition}
            onChange={(e) => setNewFlashcard({ ...newFlashcard, definition: e.target.value })}
          />
          <div className="add-card-buttons">
            <button onClick={handleAddFlashcard}>Add</button>
            <button onClick={() => setIsAddingFlashcard(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="flashcards">
        {studySet.flashcards.map((flashcard) => (
          <div key={flashcard.id} className="flashcard">
            <div className="term">{flashcard.term}</div>
            <div className="definition">{flashcard.definition}</div>
            <div className="flashcard-buttons">
              <button
                onClick={() =>
                  handleEditFlashcard(flashcard.id, flashcard.term, flashcard.definition)
                }
              >
                Edit
              </button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewStudySetPage;
