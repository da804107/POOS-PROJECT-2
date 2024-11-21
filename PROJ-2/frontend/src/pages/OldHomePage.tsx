import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import StudySetsUI from '../components/OldHomePageUI';

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
