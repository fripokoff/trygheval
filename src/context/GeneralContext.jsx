import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAttachments } from '../hooks/useAttachments';
import { set } from 'react-hook-form';


const GeneralContext = createContext();

export function GeneralProvider({ children, sheetData, setSelectedDate, selectedDate }) {
  const { addAttachment, resetAttachments } = useAttachments();
  const [introductionData, setIntroductionData] = useState([]);
  const [guidelinesData, setGuidelinesData] = useState([]);
  const [numberOfMandatorySections, setNumberOfMandatorySections] = useState(0);
  const [numberOfBonusSections, setNumberOfBonusSections] = useState(0);
  const [numberOfAttachments, setNumberOfAttachments] = useState(0);
  const [attachments, setAttachments] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [students, setStudents] = useState(0);
  const [status, setStatus] = useState("active");
  const [evalPoints, setEvalPoints] = useState(0);
  const [time, setTime] = useState(0);
  const updateGradingOption = useCallback((id, value) => {
    setGradingOptions(prev => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  const [gradingOptions, setGradingOptions] = useState({
    ok: true,
    outstanding: true,
    empty_work: true,
    incomplete_work: true,
    invalid_compilation: true,
    norme: true,
    cheat: true,
    crash: true,
    concerning_situations: true,
    leaks: true,
    forbidden_functions: true,
    cannot_support: true
  });

  const handleAttachments = useCallback((attachmentsData) => {
    if (!attachmentsData) return;
    
    const newAttachments = Array.isArray(attachmentsData) 
      ? attachmentsData.map((attachment, index) => ({
          title: typeof attachment === 'object' ? attachment.title : `Attachment ${index + 1}`,
          url: typeof attachment === 'object' ? attachment.url : attachment
        }))
      : [];
      resetAttachments();
    for (var i = 0; i < newAttachments.length; i++) {
      
      addAttachment(newAttachments[i].title, newAttachments[i].url);
    }
    setAttachments(newAttachments);
    setNumberOfAttachments(newAttachments.length);
  }, []);


  useEffect(() => {
    if (!sheetData) return;
  
    const updates = {
      basic: {
        projectTitle: sheetData.project_title || "",
        students: sheetData.students || 0,
        status: sheetData.status || "active",
        evalPoints: sheetData.eval_points || 0,
        time: sheetData.time || 0
      },
      content: {
        introduction: sheetData.introduction || [],
        guidelines: sheetData.guidelines || []
      }
    };
  
    setProjectTitle(prev => prev !== updates.basic.projectTitle ? updates.basic.projectTitle : prev);
    setStudents(prev => prev !== updates.basic.students ? updates.basic.students : prev);
    setStatus(prev => prev !== updates.basic.status ? updates.basic.status : prev);
    setEvalPoints(prev => prev !== updates.basic.evalPoints ? updates.basic.evalPoints : prev);
    setTime(prev => prev !== updates.basic.time ? updates.basic.time : prev);
  
    setIntroductionData(prev => 
      JSON.stringify(prev) !== JSON.stringify(updates.content.introduction) 
        ? updates.content.introduction 
        : prev
    );
    setGuidelinesData(prev => 
      JSON.stringify(prev) !== JSON.stringify(updates.content.guidelines) 
        ? updates.content.guidelines 
        : prev
    );
  
    if (sheetData.attachments) {
      handleAttachments(sheetData.attachments);
    }
  
    if (sheetData.gradingOptions?.[0]) {
      const importedOptions = sheetData.gradingOptions[0];
      setGradingOptions(prev => {
        const hasChanges = Object.keys(prev).some(
          key => importedOptions[key] !== undefined && Boolean(importedOptions[key]) !== prev[key]
        );
        
        if (!hasChanges) return prev;
        
        return Object.keys(prev).reduce((acc, key) => ({
          ...acc,
          [key]: importedOptions[key] !== undefined ? Boolean(importedOptions[key]) : prev[key]
        }), {});
      });
    }
  
    if (sheetData.updated_at) {
      const newDate = new Date(sheetData.updated_at);
      setSelectedDate(newDate);
    }
    
  }, [sheetData, handleAttachments, setSelectedDate]);

  const value = {
    selectedDate,
    setSelectedDate,
    introductionData: introductionData || [],
    setIntroductionData,
    guidelinesData: guidelinesData || [],
    setGuidelinesData,
    numberOfMandatorySections,
    setNumberOfMandatorySections,
    numberOfBonusSections,
    setNumberOfBonusSections,
    numberOfAttachments,
    setNumberOfAttachments,
    attachments,
    setAttachments,
    gradingOptions,
    updateGradingOption,
    projectTitle,
    setProjectTitle,
    students,
    setStudents,
    status,
    setStatus,
    evalPoints,
    setEvalPoints,
    time,
    setTime
  };

  return (
    <GeneralContext.Provider value={value}>
      {children}
    </GeneralContext.Provider>
  );
}

export const useGeneralContext = () => useContext(GeneralContext);