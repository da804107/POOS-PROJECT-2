import '../styles/LoggedInName.css';

function LoggedInName(){
    var user={}

    function doLogout(event:any) : void {
        event.preventDefault();

        alert('doLogout()');
    };

    return(
        <div id="loggedInDiv">
            <span id="userName">Welcome Back Jamie Fraser !</span><br />
            <button type="button" id="logoutButton" className="buttons"
            onClick={doLogout}> LOG OUT </button>
        </div>
    );
};

export default LoggedInName;