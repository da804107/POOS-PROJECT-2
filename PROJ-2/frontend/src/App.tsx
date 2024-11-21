import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage.tsx';
import HomePage from './pages/HomePage.tsx';
import StudySetsPage from './pages/StudySetsPage.tsx';
import CreateAccountPage from './pages/CreateAccountPage.tsx';
import NewStudySetPage from './pages/NewStudySetPage.tsx';
import EditStudySetPage from './pages/EditStudySetPage.tsx';
import IndexCardPage from './pages/IndexCardPage.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/studySets" element={<StudySetsPage />} />
        <Route path="/newAccount" element={<CreateAccountPage />} />
        <Route path="/newStudySet" element={<NewStudySetPage />} />
        <Route path="/editStudySet" element={<EditStudySetPage />} />
        <Route path="/indexCards" element={<IndexCardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
