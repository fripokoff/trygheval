import { useGeneralContext } from '../context/GeneralContext';

export const useGeneralSection = (setOptions) => {
  const {
    setSheetData,
    selectedDate,
    setIntroductionData,
    setGuidelinesData,
    handleImportData,
    numberOfMandatorySections,
    setNumberOfMandatorySections,
    numberOfBonusSections,
    setNumberOfBonusSections,
    numberOfAttachments,
    setNumberOfAttachments
  } = useGeneralContext();

  return {
    selectedDate,
    handleImportData: (event) => handleImportData(event, setOptions, setSheetData),
    handleIntroduction: (e) => {
      const introArray = e.target.value.split('\n');
      setIntroductionData(introArray);
    },
    handleGuidelines: (e) => {
      const guidelinesArray = e.target.value.split('\n');
      setGuidelinesData(guidelinesArray);
    },
    numberOfMandatorySections,
    setNumberOfMandatorySections,
    numberOfBonusSections,
    setNumberOfBonusSections,
    numberOfAttachments,
    setNumberOfAttachments
  };
};