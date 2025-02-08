import React, { useState } from 'react';
import editViewSheet from '../components/editViewSheet';
import { AttachmentProvider } from '../contexts/AttachmentContext';
import { GeneralProvider } from '../contexts/GeneralContext';
import { SectionProvider } from '../contexts/SectionContext';
import { GradingProvider } from '../contexts/GradingContext';
import { SubmitProvider } from '../contexts/SubmitContext';

function Sheet() {
  const [sheetData, setSheetData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());


  return (
    <AttachmentProvider sheetData={sheetData}>
      <GeneralProvider sheetData={sheetData} setSelectedDate={setSelectedDate} selectedDate={selectedDate}>
        <SectionProvider sheetData={sheetData}>
          <GradingProvider>
            <SubmitProvider setSheetData={setSheetData}>
              <editViewSheet selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </SubmitProvider>
          </GradingProvider>
        </SectionProvider>
      </GeneralProvider>
    </AttachmentProvider>
  );
}

export default Sheet;