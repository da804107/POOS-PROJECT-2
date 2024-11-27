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
    let _ud: any = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);

// Made changes to call the api, going to test , might revert

    const handleSaveSet = async () => {
        if (newSetName.trim()) {
            const newSet = { id: Date.now().toString(), name: newSetName, isEditing: false };
            try {
            await doAddSet(newSet);
            setStudySets([...studySets, newSet]);
            setNewSetName('');
            setIsAdding(false);
            } catch (error) {
                console.error('Failed to add set', error);
            }
        }
    };

    async function doAddSet(set: { id: string; name: string; isEditing: boolean; }): Promise<void> {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(set),
        };
        try {
            const response = await fetch('https://project.annetteisabrunette.xyz/api/addset', requestOptions);

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Error adding set');
            }

        } catch(error : any) {
            console.error('Error during add set');
            throw error;
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
