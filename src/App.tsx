import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ProjectCargo from './pages/ProjectCargo';
import ITL from './pages/ITL';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
