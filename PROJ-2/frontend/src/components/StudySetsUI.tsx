import '../styles/StudySetsUI.css';
import React, { useState } from 'react';

function StudySetsUI() {
    const [message, setMessage] = React.useState('');
    const [searchResults, setSearchResults] = React.useState('');
    const [studySetList, setStudySetList] = React.useState('');
    const [search, setSearchValue] = React.useState('');
    const [studySet, setStudySetNameValue] = React.useState('');

    function addStudySet(event:any) : void {
        event.preventDefault();

        alert('addStudySet() ' + studySet);
    };

    function searchStudySets(event:any) : void {
        event.preventDefault();

        alert('searchStudySet() ' + search);
    };

    function handleSearchTextChange(e:any) : void {
        setSearchValue( e.target.value );
    }

    return(
        <div id="accessUIDiv">
            <br />
            <input type="text" id="searchText" placeholder="Search Your Study Sets..."
            onChange={handleSearchTextChange}/>
            <div id="button-container">
            <button type="button" id="searchStudySetButton" className="buttons"
            onClick={searchStudySets}> SEARCH </button><br />
            <span id="studySetResult">{searchResults}</span>
            <button type="button" id="addStudySetButton" className="buttons"
            onClick={addStudySet}> ADD </button><br />
            </div>
            <p id="studySetsList">{studySetList}</p><br /><br />
            <span id="studySetAddResult">{message}</span>
        </div>
    );
}

export default StudySetsUI;