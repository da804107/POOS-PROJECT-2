import '../styles/StudySetsUI.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StudySetsUI() {
    let _ud: any = localStorage.getItem('user_data');
      let ud = JSON.parse(_ud);
      let userId: string = ud.id;
    const [message, setMessage] = React.useState('');
    const [searchResults, setSearchResults] = React.useState('');
    const [studySetList, setStudySetList] = React.useState('');
    const [search, setSearchValue] = React.useState('');
    const navigate = useNavigate();
    //searchStudySets();

    function addStudySet() {
        navigate('/newStudySet');
    };

    /*function searchStudySets(event:any) : void {
        event.preventDefault();

        alert('searchStudySet() ' + search);
    };*/
    
    async function searchStudySets(e: any): Promise<void> {
        e.preventDefault();
        let obj = { userId: userId, search: search };
        let js = JSON.stringify(obj);
        try {
            const response = await
                fetch('https://project.annetteisabrunette.xyz/api/searchsets',
                    {
                        method: 'POST', body: js, headers: {
                            'Content-Type':
                                'application/json'
                        }
                    });
            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for (let i = 0; i < _results.length; i++) {
                resultText += _results[i][1];
                if (i < _results.length - 1) {
                    resultText += '\n';
                }
            }
            setSearchResults('Card(s) have been retrieved');
            setStudySetList(resultText);
        }
        catch (error: any) {
            alert(error.toString());
            setStudySetList(error.toString());
        }
    };

    function handleSearchTextChange(e:any) : void {
        setSearchValue( e.target.value );
    }

    return(
        <div id="accessUIDiv" onload={searchStudySets}>
            <br />
            <input type="text" id="searchText" placeholder="Search Your Study Sets..."
            onChange={handleSearchTextChange}/>
            <div id="home-button-container">
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
