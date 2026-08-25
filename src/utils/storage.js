import { INITIAL_RECOMMENDATIONS } from '../data/initialRecommendations';

const STORAGE_KEY = 'citypop_community_recommendations';

export const getStoredRecommendations = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_RECOMMENDATIONS));
      return INITIAL_RECOMMENDATIONS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Failed to load stored recommendations:', err);
    return INITIAL_RECOMMENDATIONS;
  }
};

export const saveRecommendation = (newRec) => {
  try {
    const existing = getStoredRecommendations();
    const updated = [newRec, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save recommendation:', err);
    return [];
  }
};
