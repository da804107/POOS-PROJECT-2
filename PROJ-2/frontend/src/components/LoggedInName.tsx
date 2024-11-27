import { useNavigate } from 'react-router-dom';
import '../styles/LoggedInName.css';

function LoggedInName(){
    var user={}
    var _ud = localStorage.getItem('user_data');
    if (_ud == null) _ud = "";
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    var firstName = ud.username;
    console.log(ud);

    const navigate = useNavigate();

    function doLogout() {

        navigate('/');
        //alert('doLogout()');
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
