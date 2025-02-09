import { createContext, useContext, useState, useEffect } from 'react';
import { set } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

const SectionContext = createContext();

export function SectionProvider({ children , sheetData}) {
  const [mandatorySections, setMandatorySections] = useState([]);
  const [mandatoryOptionsDataFromServer, setMandatoryOptionsDataFromServer] = useState([]);
  const [numberOfMandatorySections, setNumberOfMandatorySections] = useState(0);
  const [bonusSections, setBonusSections] = useState([]);
  const [bonusSectionsDataFromServer, setBonusSectionsDataFromServer] = useState([]);
  const [numberOfBonusSections, setNumberOfBonusSections] = useState(0);


  const updateMandatorySection = (index, updatedSection) => {
    setMandatorySections(prevSections => {
      const newSections = [...prevSections];
      newSections[index] = { ...newSections[index], ...updatedSection };
      return newSections;
    });
  };
  

  const updateBonusSection = (index, updatedSection) => {
    setBonusSections(prevSections => {
      const newSections = [...prevSections];
      newSections[index] = { ...newSections[index], ...updatedSection };
      return newSections;
    });
  };

  useEffect(() => {
    if (!sheetData) return;

    if (sheetData.mandatorySections) {
      const mandatoryWithIds = sheetData.mandatorySections.map((section, index) => ({
        ...section,
        id: section.id || uuidv4(),
        index
      }));
      setMandatorySections(mandatoryWithIds);
      setMandatoryOptionsDataFromServer(sheetData.mandatorySections);
      setNumberOfMandatorySections(sheetData.mandatorySections.length);
    }

    if (sheetData.bonusSections) {
      const bonusWithIds = sheetData.bonusSections.map((section, index) => ({
        ...section,
        id: section.id || uuidv4(),
        index
      }));
      setBonusSections(bonusWithIds);
      setBonusSectionsDataFromServer(sheetData.bonusSections);
      setNumberOfBonusSections(sheetData.bonusSections.length);
    }
  }, [sheetData]);
  
  const value = {
    // Mandatory sections
    mandatorySections,
    setMandatorySections,
    mandatoryOptionsDataFromServer,
    setMandatoryOptionsDataFromServer,
    numberOfMandatorySections,
    setNumberOfMandatorySections,
    updateMandatorySection,
    // Bonus sections
    bonusSections,
    setBonusSections,
    bonusSectionsDataFromServer,
    setBonusSectionsDataFromServer,
    numberOfBonusSections,
    setNumberOfBonusSections,
    updateBonusSection,
  };

  return (
    <SectionContext.Provider value={value}>
      {children}
    </SectionContext.Provider>
  );
}

export const useSectionContext = () => useContext(SectionContext);