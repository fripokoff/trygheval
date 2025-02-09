import { useSectionContext } from '../contexts/SectionContext';
import { v4 as uuidv4 } from 'uuid';

export const useBonusSections = () => {
  const {
    setBonusSections,
    setNumberOfBonusSections
  } = useSectionContext();

  const addBonusSection = () => {
    setBonusSections(prevSections => {
      const newIndex = prevSections.length;
      return [...prevSections, {
        id: uuidv4(),
        index: newIndex,
        description: '',
        yes_no: true,
      }];
    });
    setNumberOfBonusSections(prev => prev + 1);
  };

  const removeBonusSection = (indexToRemove) => {
    setBonusSections(prevSections => {
      const updatedSections = prevSections.filter(section => section.index !== indexToRemove);
      return updatedSections.map((section, newIndex) => ({
        ...section,
        index: newIndex
      }));
    });
    setNumberOfBonusSections(prev => prev - 1);
  };

  return {
    addBonusSection,
    removeBonusSection
  };
};