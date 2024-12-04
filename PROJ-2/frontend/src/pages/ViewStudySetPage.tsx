import { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import ViewStudySetUI from "../components/ViewStudySetUI";

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

const ViewStudySetPage = () => {
  let _ud: any = localStorage.getItem("user_data");
  let ud = JSON.parse(_ud);
  let Id: string = ud.id;

  let _sn: any = localStorage.getItem("set_name");
  let sn = JSON.parse(_sn);
  let setName = sn.name;

  const [studySet, setStudySet] = useState<StudySet>({
    id: "",
    name: "",
    flashcards: [],
    isEditingName: false,
  });
  const [isAddingFlashcard, setIsAddingFlashcard] = useState(false);
  const [isCardView, setIsCardView] = useState(false);
  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    const handleLoad = async () => {
      const userId = Id;
      console.log("Loading sets");

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId, setName: setName }),
      };
      try {
        const response = await fetch(
          "https://project.annetteisabrunette.xyz/api/viewset",
          requestOptions
        );
        const fetchedSet = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch sets");
        }

        console.log(fetchedSet.results.Flashcards);

        if (fetchedSet.results) {
          setStudySet({
            id: Id,
            name: setName,
            flashcards: fetchedSet.results.Flashcards || [],
            isEditingName: false,
          });
        }
      } catch (error) {
        console.error("Failed to load sets", error);
      }
    };

    if (Id) {
      handleLoad();
    }
  }, [Id, setName]);

  const handleEditSetName = () => {
    setStudySet({ ...studySet, isEditingName: !studySet.isEditingName });
  };

  const handleSaveSetName = async (newName: string) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Id,
          setId: studySet.id,
          newName: newName,
        }),
      };

      const response = await fetch(
        "https://project.annetteisabrunette.xyz/api/setName",
        requestOptions
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error updating set name");
      }

      setStudySet((prev) => ({ ...prev, name: newName, isEditingName: false }));
    } catch (error) {
      console.error("Failed to save set name:", error);
    }
  };

  const handleAddFlashcard = async () => {
    const newFlashcard: Flashcard = {
      id: Date.now().toString(),
      term,
      definition,
    };

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Id,
          setName: studySet.name,
          flashcard: newFlashcard,
        }),
      };

      const response = await fetch(
        "https://project.annetteisabrunette.xyz/api/addflashcard",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Error adding flashcard");
      }

      setStudySet((prev) => ({
        ...prev,
        flashcards: [...prev.flashcards, newFlashcard],
      }));
      setTerm("");
      setDefinition("");
      setIsAddingFlashcard(false);
    } catch (error) {
      console.error("Failed to add flashcard:", error);
    }
  };

  const handleDeleteFlashcard = async (flashcardId: string) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Id,
          setName: studySet.name,
          flashcardId: flashcardId,
        }),
      };

      const response = await fetch(
        "https://project.annetteisabrunette.xyz/api/deleteflashcard",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Error deleting flashcard");
      }

      setStudySet((prev) => ({
        ...prev,
        flashcards: prev.flashcards.filter((card) => card.id !== flashcardId),
      }));
    } catch (error) {
      console.error("Failed to delete flashcard:", error);
    }
  };

  const handleEditFlashcard = async (
    id: string,
    newTerm: string,
    newDefinition: string
  ) => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: Id,
          setName: studySet.name,
          flashcardId: flashcardId,
          newTerm: newTerm,
          newDefinition: newDefinition,
        }),
      };

      const response = await fetch(
        "https://project.annetteisabrunette.xyz/api/editflashcard",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Error editing flashcard");
      }

      setStudySet((prev) => ({
        ...prev,
        flashcards: prev.flashcards.map((card) =>
          card.id === flashcardId
            ? { ...card, term: newTerm, definition: newDefinition }
            : card
        ),
      }));
    } catch (error) {
      console.error("Failed to edit flashcard:", error);
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
        handleDeleteSet={() => {}}
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
