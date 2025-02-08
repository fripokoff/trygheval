import { useSectionContext } from '../contexts/SectionContext';
import { v4 as uuidv4 } from 'uuid';

export const useMandatorySections = () => {
  const {
    setMandatorySections,
    setNumberOfMandatorySections
  } = useSectionContext();

  const addMandatorySection = () => {
    setMandatorySections(prevSections => {
      const newIndex = prevSections.length;
      return [...prevSections, {
        id: uuidv4(),
        index: newIndex,
        description: '',
        yes_no: true,
        conclusion: ''
      }];
    });
    setNumberOfMandatorySections(prev => prev + 1);
  };

  const removeMandatorySection = (indexToRemove) => {
    setMandatorySections(prevSections => {
      const updatedSections = prevSections.filter(section => section.index !== indexToRemove);
      return updatedSections.map((section, newIndex) => ({
        ...section,
        index: newIndex
      }));
    });
    setNumberOfMandatorySections(prev => prev - 1);
  };

  return {
    addMandatorySection,
    removeMandatorySection
  };
};