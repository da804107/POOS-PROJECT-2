import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage.tsx';
import StudySetsPage from './pages/StudySetsPage.tsx';
import CreateAccountPage from './pages/CreateAccountPage.tsx';
import NewStudySetPage from './pages/NewStudySetPage.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/studySets" element={<StudySetsPage />} />
        <Route path="/newAccount" element={<CreateAccountPage />} />
        <Route path="/newStudySet" element={<NewStudySetPage />} />
      </Routes>
    </Router>
  );
};

export default App;
