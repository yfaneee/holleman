import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ProjectCargo from './pages/ProjectCargo';
import ITL from './pages/ITL';
import HeavyLift from './pages/HeavyLift';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
