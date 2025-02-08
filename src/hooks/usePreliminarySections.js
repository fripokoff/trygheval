import { useSectionContext } from '../context/SectionContext';
import { v4 as uuidv4 } from 'uuid';

export const usePreliminarySections = () => {
  const {
    setPreliminarySections,
    setNumberOfPreliminarySections
  } = useSectionContext();

  const addPreliminarySection = () => {
    setPreliminarySections(prevSections => {
      const newIndex = prevSections.length;
      return [...prevSections, {
        id: uuidv4(),
        index: newIndex,
        title: '',
        subtitle: '',
        description: '',
        yes_no: true,
        conclusion: ''
      }];
    });
    setNumberOfPreliminarySections(prev => prev + 1);
  };

  const removePreliminarySection = (indexToRemove) => {
    setPreliminarySections(prevSections => {
      const updatedSections = prevSections.filter(section => section.index !== indexToRemove);
      return updatedSections.map((section, newIndex) => ({
        ...section,
        index: newIndex
      }));
    });
    setNumberOfPreliminarySections(prev => prev - 1);
  };

  return {
    addPreliminarySection,
    removePreliminarySection
  };
};