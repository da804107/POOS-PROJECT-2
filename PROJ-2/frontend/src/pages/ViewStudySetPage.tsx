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


// src/pages/ViewStudySetPage.tsx

import React, { useState, useEffect } from 'react';
import ViewStudySetUI from '../components/ViewStudySetUI';
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

const ViewStudySetPage: React.FC = () => {
  const { setId } = useParams<{ setId: string }>();
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
          headers: {
            'Content-Type': 'application/json',
          },
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

  const handleDeleteSet = async () => {
    try {
      const requestOptions = {
        method: 'POST', // Or 'DELETE' if your backend expects it
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          setId: studySet?.id,
        }),
      };

      const response = await fetch('https://project.annetteisabrunette.xyz/api/deleteset', requestOptions);

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Error deleting set');
      }

      // After deletion, redirect the user or update the UI
      window.location.href = '/sets'; // Adjust the URL as needed
    } catch (error) {
      console.error('Failed to delete set:', error);
      // Optionally, display an error message to the user
    }
  };

  // Placeholder functions for other handlers
  const handleAddFlashcard = () => {};
  const handleEditSetName = (newName: string) => {};
  const handleEditFlashcard = (id: string, newTerm: string, newDefinition: string) => {};

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

export default ViewStudySetPage;

