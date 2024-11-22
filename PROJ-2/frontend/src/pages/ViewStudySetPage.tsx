import { useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import ViewStudySetUI from '../components/ViewStudySetUI';

const ViewStudySetPage = () => {
    const { id } = useParams();
    return(
        <div>
            <PageTitle />
            <ViewStudySetUI />
        </div>
    );
}

export default ViewStudySetPage;