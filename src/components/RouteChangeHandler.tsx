import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const RouteChangeHandler: React.FC = () => {
  const { pathname } = useLocation();
  const { refreshOriginalTexts } = useLanguage();

  useEffect(() => {
    // Trigger refresh of original texts when route changes
    refreshOriginalTexts();
  }, [pathname, refreshOriginalTexts]);

  return null;
};

export default RouteChangeHandler;
