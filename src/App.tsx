import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import ProjectCargo from './pages/ProjectCargo';
import ITL from './pages/ITL';
import HeavyLift from './pages/HeavyLift';
import Fleet from './pages/Fleet';
import Agro from './pages/Agro';
import Proiecte from './pages/Proiecte';
import ProjectPage from './pages/ProjectPage';
import DespreNoi from './pages/DespreNoi';
import Cariere from './pages/Cariere';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import ArticlePage from './pages/ArticlePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from './components/ScrollToTop';
import RouteChangeHandler from './components/RouteChangeHandler';
import CookieConsent from './components/CookieConsent';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <RouteChangeHandler />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project-cargo" element={<ProjectCargo />} />
              <Route path="/itl" element={<ITL />} />
              <Route path="/heavy-lift" element={<HeavyLift />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/portops" element={<Agro />} />
              <Route path="/proiecte" element={<Proiecte />} />
              <Route path="/proiecte/:projectId" element={<ProjectPage />} />
              <Route path="/despre-noi" element={<DespreNoi />} />
              <Route path="/cariere" element={<Cariere />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/contact/formular" element={<Contact />} />
              <Route path="/contact/date" element={<Contact />} />
              <Route path="/contact/cerere" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:articleId" element={<ArticlePage />} />
              <Route path="/comunicare" element={<Blog />} />
              <Route path="/comunicare/:articleId" element={<ArticlePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
            <CookieConsent />
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
