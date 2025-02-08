import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SectionContext = createContext();

export function SectionProvider({ children , sheetData}) {
  const [preliminarySections, setPreliminarySections] = useState([]);
  const [preliminarySectionsDataFromServer, setPreliminarySectionsDataFromServer] = useState([]);
  const [numberOfPreliminarySections, setNumberOfPreliminarySections] = useState(0);
  const [mandatorySections, setMandatorySections] = useState([]);
  const [mandatoryOptionsDataFromServer, setMandatoryOptionsDataFromServer] = useState([]);
  const [numberOfMandatorySections, setNumberOfMandatorySections] = useState(0);
  const [bonusSections, setBonusSections] = useState([]);
  const [bonusSectionsDataFromServer, setBonusSectionsDataFromServer] = useState([]);
  const [numberOfBonusSections, setNumberOfBonusSections] = useState(0);
  const [bonusIntroduction, setBonusIntroduction] = useState('');
  
  const updatePreliminarySection = (index, updatedSection) => {
    setPreliminarySections(prevSections => {
      const newSections = [...prevSections];
      newSections[index] = { ...newSections[index], ...updatedSection };
      return newSections;
    });
  };



  const updatePreliminaryIntro = (e) => {
    setPreliminaryIntroduction(e.target.value);
  };

  const updateMandatoryIntroduction = (e) => {
    setMandatoryIntroduction(e.target.value);
  };

  const updateBonusIntroduction = (e) => {
    setBonusIntroduction(e.target.value);
  };

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

    if (sheetData.preliminarySections) {
      const preliminaryWithIds = sheetData.preliminarySections.map((section, index) => ({
        ...section,
        id: section.id || uuidv4(),
        index
      }));
      setPreliminarySections(preliminaryWithIds);
      setPreliminarySectionsDataFromServer(sheetData.preliminarySections);
      setNumberOfPreliminarySections(sheetData.preliminarySections.length);
    }

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
    // Preliminary sections
    preliminarySections,
    setPreliminarySections,
    preliminarySectionsDataFromServer,
    setPreliminarySectionsDataFromServer,
    numberOfPreliminarySections,
    setNumberOfPreliminarySections,
    updatePreliminarySection,
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
    bonusIntroduction,
    setBonusIntroduction,
    updateBonusIntroduction,
    updatePreliminaryIntro,
    updateMandatoryIntroduction
  };

  return (
    <SectionContext.Provider value={value}>
      {children}
    </SectionContext.Provider>
  );
}

export const useSectionContext = () => useContext(SectionContext);