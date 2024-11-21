import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import HomePageUI from '../components/HomePageUI';
import React, { useState } from 'react';

const HomePage: React.FC = () => {
    const [studySets, setStudySets] = useState<{ id: string; name: string; isEditing: boolean }[]>([]);
    const [search, setSearch] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [newSetName, setNewSetName] = useState('');

    const handleAddSet = () => setIsAdding(true);

    const handleSaveSet = () => {
        if (newSetName.trim()) {
            const newSet = { id: Date.now().toString(), name: newSetName, isEditing: false };
            setStudySets([...studySets, newSet]);
            setNewSetName('');
            setIsAdding(false);
        }
    };

    const handleDeleteSet = (id: string) => {
        setStudySets(studySets.filter(set => set.id !== id));
    };

    const handleEditToggle = (id: string) => {
        setStudySets(studySets.map(set =>
            set.id === id ? { ...set, isEditing: !set.isEditing } : set
        ));
    };

    const handleEditSave = (id: string, newName: string) => {
        if (newName.trim()) {
            setStudySets(studySets.map(set =>
                set.id === id ? { ...set, name: newName, isEditing: false } : set
            ));
        }
    };

    const filteredSets = studySets.filter(set =>
        set.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <PageTitle />
            <LoggedInName />
            <HomePageUI
                studySets={filteredSets}
                search={search}
                setSearch={setSearch}
                isAdding={isAdding}
                newSetName={newSetName}
                setNewSetName={setNewSetName}
                handleAddSet={handleAddSet}
                handleSaveSet={handleSaveSet}
                handleDeleteSet={handleDeleteSet}
                handleEditToggle={handleEditToggle}
                handleEditSave={handleEditSave}
                setIsAdding={setIsAdding}
            />
        </div>
    );
};

export default HomePage;
