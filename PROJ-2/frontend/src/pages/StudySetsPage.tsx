import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import StudySetsUI from '../components/StudySetsUI';

const StudySetsPage = () => {
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <StudySetsUI />
        </div>
    );
}

export default StudySetsPage;
