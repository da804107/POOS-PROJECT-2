import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/LoginPage.tsx';
import StudySetsPage from './pages/StudySetsPage.tsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/studySets" element={<StudySetsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
