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

    let _sn: any = localStorage.getItem('set_name');
    let sn = JSON.parse(_sn);
    
// Made changes to call the api, going to test , might revert
    useEffect(() => {
        const handleLoad = async () => {
            const userId = Id;
            console.log("Loading sets");
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            };
            try {
                console.log(userId);
            const response = await fetch('https://project.annetteisabrunette.xyz/api/loadsets', requestOptions);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch sets');
            }

            setStudySets(data.results || []);
            console.log(data.results);
            console.log("Fetched no errors");
                
            } catch (error) {
                console.error('Failed to load sets', error);
            }
        };

        if (Id) {
            handleLoad();
        }
    }, [Id]);

    
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

    
    
    const handleDeleteSet = async (id: string) => {
        await doDeleteSet(id);
        
        const userId = Id;
            console.log("Loading sets");
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            };
            try {
                console.log(userId);
            const response = await fetch('https://project.annetteisabrunette.xyz/api/loadsets', requestOptions);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch sets');
            }

            setStudySets(data.results || []);
            console.log(data.results);
            console.log("Fetched no errors");
                
            } catch (error) {
                console.error('Failed to load sets', error);
            }
    };

    async function doDeleteSet(setTitle: string): Promise<void> {
        const set = { userId: Id, title: setTitle};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(set),
        };
        console.log(set);
        try {
            const response = await fetch('https://project.annetteisabrunette.xyz/api/deleteset', requestOptions);

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Error deleting set');
            }

        } catch(error : any) {
            console.error('Error during delete set');
            throw error;
        }
    };

    async function doUpdateSet(setId: string, setTitle: string): Promise<void> {
        const set = { userId: Id, setId: setId, newName: setTitle};
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(set),
        };
        console.log(set);
        try {
            const response = await fetch('https://project.annetteisabrunette.xyz/api/setName', requestOptions);

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error || 'Error deleting set');
            }

        } catch(error : any) {
            console.error('Error during delete set');
            throw error;
        }
    };

    /*const handleEditToggle = (id: string) => {
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
    };*/

    const handleEditToggle = (id: string) => {
        setStudySets(studySets.map(set => {
            //set.id === id ? { ...set, isEditing: !set.isEditing } : set
            if (set.id === id) {
            var editSet = {name: set.name};
                localStorage.setItem('set_name', JSON.stringify(editSet)); // Store the name
                return { ...set, isEditing: !set.isEditing }; // Toggle isEditing
            }
          return set;
        }));
        
    };

    // const handleEditSave = (id: string, newName: string) => {
    //     if (newName.trim()) {
    //         setStudySets(studySets.map(set => {
    //         //set.id === id ? { ...set, isEditing: !set.isEditing } : set
    //         if (set.id === id) {
    //             let _sn: any = localStorage.getItem('set_name');
    //             let sn = JSON.parse(_sn);
    //             doUpdateSet(sn.name, newName) // Store the name
    //             return { ...set, name: newName, isEditing: !set.isEditing }; // Toggle isEditing
    //         }
    //         return set;
    //         }));
    //     }
    // };
    const handleEditSave = (id: string, newName: string) => {
    if (newName.trim()) {
        setStudySets(studySets.map(set => {
            if (set.id === id) {
                doUpdateSet(set.id, newName); // Pass correct ID
                return { ...set, name: newName, isEditing: false }; // Toggle isEditing
            }
            return set;
        }));
    }
    };
    
    const handleViewSet = (id: string) => {
        setStudySets(studySets.map(set => {
            //set.id === id ? { ...set, isEditing: !set.isEditing } : set
            if (set.id === id) {
            var editSet = {name: set.name};
                localStorage.setItem('set_name', JSON.stringify(editSet)); // Store the name
                //navigate(`/studySet/${set.name}`);
                window.location.href = '/studySet/' + set.name;
                return set;
            }
          return set;
        }));
        
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
                handleViewSet={handleViewSet}
                setIsAdding={setIsAdding}
            />
        </div>
    );
};


export default HomePage;
