import '../styles/NewStudySetUI.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewStudySetUI() {
    //const [message, setMessage] = React.useState('');
    const [word, setWord] = React.useState('');
    const [definition, setDefinition] = React.useState('');
    const [pair, setPair] = React.useState('');
    const navigate = useNavigate();

    function handleSetWord(e:any) : void {
        setWord( e.target.value );
    }

    function handleSetDefinition(e:any) : void {
        setDefinition( e.target.value );
    }

    function doAddWord(event:any) : void {
        event.preventDefault();

        alert(word + ' ' + definition);
    };

    function doGoHome() {
        navigate('/studySets');
    }

    return(
        <div id="newStudySetDiv">
            <span id="inner-title">CREATE A NEW STUDY SET</span><br />
            <input type="submit" id="goHomeButton" className="buttons" value="GO HOME"
            onClick={doGoHome} />
            <div id="addition-container">
            <input type="text" id="word" placeholder="Word"
            onChange={handleSetWord}/><br />
            <input type="text" id="definition" placeholder="Definition"
            onChange={handleSetDefinition}/><br />
            </div>
            <input type="submit" id="addWordButton" className="buttons" value="ADD WORD"
            onClick={doAddWord} />
            <p id="studySetsList">{pair}</p><br /><br />
        </div>
    );
}

export default NewStudySetUI;