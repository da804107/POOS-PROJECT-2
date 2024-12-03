import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import HomePageUI from '../components/HomePageUI';
import React, { useState, useEffect, useLayoutEffect } from 'react';

const HomePage: React.FC = () => {
    const [studySets, setStudySets] = useState<{ id: string; name: string; isEditing: boolean }[]>([]);
    const [search, setSearch] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [newSetName, setNewSetName] = useState('');

    const handleAddSet = () => setIsAdding(true);
    let _ud: any = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let Id: string = ud.id;

// Made changes to call the api, going to test , might revert
    useLayoutEffect(() => {
        if (Id) {
            handleLoad();
        }
    }, []);

    
    const handleLoad = async () => {
        const userId = Id;
        console.log(userId);
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId }),
        };
        try {
            console.log(userId);
            const response = await fetch('https://project.annetteisabrunette.xyz/api/loadsets', requestOptions); 
            if(!response.ok) {
                throw new Error('Failed to fetch sets');
            }
            const newSets = await response.json();
            console.log(newSets);
            console.log(studySets);
            setStudySets(newSets);
            console.log("Fetched no errors");
            
        } catch (error) {
            console.error('Failed to load sets', error);
        }
    }

    useEffect(() => {
        console.log('Sets updated:', studySets);
        }, [studySets]);

    
    const handleSaveSet = async () => {
        if (newSetName.trim()) {
            const newSet = { userId: Id, title: newSetName};
            try {
            await doAddSet(newSet);
            setStudySets(prevStudySets => [...prevStudySets, { id: newSet.userId, name: newSet.title, isEditing: false }]);
            setNewSetName('');
            setIsAdding(false);
            } catch (error) {
                console.error('Failed to add set', error);
            }
        }
    };

    async function doAddSet(set: { userId: string; title: string }): Promise<void> {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(set),
        };
        console.log(Id);
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
                handleLoad={handleLoad}
            />
        </div>
    );
};

export default HomePage;
