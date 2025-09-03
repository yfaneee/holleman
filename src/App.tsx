import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ProjectCargo from './pages/ProjectCargo';
import ITL from './pages/ITL';
import HeavyLift from './pages/HeavyLift';
import Agro from './pages/Agro';
import Proiecte from './pages/Proiecte';
import ProjectPage from './pages/ProjectPage';
import DespreNoi from './pages/DespreNoi';
import Cariere from './pages/Cariere';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project-cargo" element={<ProjectCargo />} />
          <Route path="/itl" element={<ITL />} />
          <Route path="/heavy-lift" element={<HeavyLift />} />
          <Route path="/agro" element={<Agro />} />
          <Route path="/proiecte" element={<Proiecte />} />
          <Route path="/proiecte/:projectId" element={<ProjectPage />} />
          <Route path="/despre-noi" element={<DespreNoi />} />
          <Route path="/cariere" element={<Cariere />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
