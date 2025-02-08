import { createContext, useContext } from 'react';
import { useGeneralContext } from './GeneralContext';
import { useSectionContext } from './SectionContext';
import { useAttachmentContext } from './AttachmentContext';
import { ToastContext } from './ToastContext';

const SubmitContext = createContext(null);

export function SubmitProvider({ children, setSheetData, sheetData }) {
  const { addToast } = useContext(ToastContext);

  const handleAddToast = ({type, msg, position}) => {
    addToast({
      type: type,
      message: msg,
      duration: 5000,
      position: position,
      dismissable: true,
      animationIn: 'slide-in-right',
      animationOut: 'slide-out-left',
      animationSpeed: 0.5,
    });
  };

  const { 
    introductionData, 
    guidelinesData, 
    selectedDate, 
    gradingOptions,
    projectTitle,
    students,
    status,
    evalPoints,
    time
  } = useGeneralContext();
  const { 
    preliminarySections,
    mandatorySections,
    bonusSections
  } = useSectionContext();
  const { attachments } = useAttachmentContext();
  
  const handleSubmit = (download, formData = null) => {
    const project_title = formData?.project_title || projectTitle;
    try {
      const formattedPreliminarySections = preliminarySections?.map((section) => ({
        title: section.title || '',
        subtitle: section.subtitle || '',
        description: section.description || '',
        conclusion: section.conclusion || '',
        yes_no: section.yes_no || false,
        type: "preliminary"
      })) || [];
  
      const formattedMandatorySections = mandatorySections?.map((section) => ({
        title: section.title || '',
        subtitle: section.subtitle || '',
        description: section.description || '',
        conclusion: section.conclusion || '',
        yes_no: section.yes_no || false,
        type: "mandatory"
      })) || [];
  
      const formattedBonusSections = bonusSections?.map((section) => ({
        title: section.title || '',
        subtitle: section.subtitle || '',
        description: section.description || '',
        conclusion: section.conclusion || '',
        yes_no: section.yes_no || false,
        type: "bonus"
      })) || [];

      const finalAttachments = attachments.map(attachment => ({
        title: attachment.title || '',
        url: attachment.url || ''
      }));
      const date = selectedDate?.toISOString() || sheetData?.updated_at || new Date().toISOString();
      const newData = {
        project_title: project_title,
        students: formData?.students || students,
        status: formData?.status || status,
        eval_points: formData?.eval_points || evalPoints,
        time: formData?.time || time,
        introduction : formData?.introduction || introductionData || [],
        guidelines : formData?.guidelines || guidelinesData || [],
        preliminarySections: formData?.preliminarySections || formattedPreliminarySections || [],
        preliminaryIntro: formData?.preliminaryIntro || '',
        mandatorySections: formData?.mandatorySections || formattedMandatorySections || [],
        mandatoryIntro: formData?.mandatoryIntro || '',
        bonusSections: formData?.bonusSections || formattedBonusSections || [],
        bonusIntro: formData?.bonusIntro || '',
        attachments: formData?.attachments || finalAttachments || [],
        updated_at: date,
        gradingOptions: formData?.gradingOptions || gradingOptions || [],
      };

      const json = JSON.stringify({
        success: true,
        data: [newData],
        message: "Sheet created successfully"
      }, null, 2);
      setSheetData(newData);
      if(download)
      {
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project_title}_data.json`;
        a.click();
        URL.revokeObjectURL(url);
        handleAddToast({
          type: 'success',
          msg: 'Sheet downloaded successfully',
          position: 'top-right'
        })
      }
      

      

    } catch (error) {
      console.error("Error creating sheet:", error);
      handleAddToast({
        type: 'error',
        msg: 'Failed to create sheet',
        position: 'top-right'
      })
    }
  };

  return (
    <SubmitContext.Provider value={{ handleSubmit }}>
      {children}
    </SubmitContext.Provider>
  );
}

export const useSubmit = () => {
  const context = useContext(SubmitContext);
  if (!context) {
    throw new Error('useSubmit must be used within a SubmitProvider');
  }
  return context;
};