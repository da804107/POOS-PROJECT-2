function StudySetsUI() {
    function addStudySet(event:any) : void {
        event.preventDefault();

        alert('addStudySet()');
    };

    function searchStudySets(event:any) : void {
        event.preventDefault();

        alert('searchStudySet');
    };

    return(
        <div id="accessUIDiv">
            <br />
            <input type="text" id="searchText" placeholder="Study Set to Search For" />
            <button type="button" id="searchStudySetButton" className="buttons"
            onClick={searchStudySets}> Search Study Sets </button><br />
            <span id="studySetResult"></span>
            <p id="studySetList"></p><br /><br />
            <input type="text" id="cardText" placeholder="Study Set to Add" />
            <button type="button" id="addStudySetButton" className="buttons"
            onClick={addStudySet}> Add Study Set </button><br />
            <span id="studySetAddResult"></span>
        </div>
    );
}

export default StudySetsUI;