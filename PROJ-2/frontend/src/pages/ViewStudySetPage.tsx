import { useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import NewStudySetUI from '../components/ViewStudySetUI';

const NewStudySetPage = () => {
    const { id } = useParams();
    return(
        <div>
            <PageTitle />
            <NewStudySetUI />
        </div>
    );
}

export default NewStudySetPage;