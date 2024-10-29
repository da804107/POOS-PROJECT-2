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

    function handleStudySetTextChange(e:any) : void {
        setStudySetNameValue( e.target.value );
    }

    return(
        <div id="accessUIDiv">
            <br />
            <input type="text" id="searchText" placeholder="Study Set to Search For"
            onChange={handleSearchTextChange}/>
            <button type="button" id="searchStudySetButton" className="buttons"
            onClick={searchStudySets}> Search Study Sets </button><br />
            <span id="studySetResult">{searchResults}</span>
            <p id="studySetsList">{studySetList}</p><br /><br />
            <input type="text" id="studySetText" placeholder="Study Set to Add"
            onChange={handleStudySetTextChange}/>
            <button type="button" id="addStudySetButton" className="buttons"
            onClick={addStudySet}> Add Study Set </button><br />
            <span id="studySetAddResult">{message}</span>
        </div>
    );
}

export default StudySetsUI;