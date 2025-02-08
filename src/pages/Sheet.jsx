import React, { useState } from 'react';
import AddContent from '../components/AddContent';
import { AttachmentProvider } from '../context/AttachmentContext';
import { GeneralProvider } from '../context/GeneralContext';
import { SectionProvider } from '../context/SectionContext';
import { GradingProvider } from '../context/GradingContext';
import { SubmitProvider } from '../context/SubmitContext';

function Sheet() {
  const [sheetData, setSheetData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <AttachmentProvider sheetData={sheetData}>
      <GeneralProvider sheetData={sheetData} setSelectedDate={setSelectedDate} selectedDate={selectedDate}>
        <SectionProvider sheetData={sheetData}>
          <GradingProvider>
            <SubmitProvider setSheetData={setSheetData}>
              <AddContent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </SubmitProvider>
          </GradingProvider>
        </SectionProvider>
      </GeneralProvider>
    </AttachmentProvider>
  );
}

export default Sheet;