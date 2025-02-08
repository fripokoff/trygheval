import React from 'react';

function ViewIntroductionSection({ sheetData, formatText }) {
  return (
    <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg'>
      <h2 className='text-2xl font-bold'>
        Introduction
      </h2>
      <p className='pt-2 pb-7'>
        Please follow the rules below:
      </p>

      <div className='space-y-5'>
        {sheetData.introduction ? sheetData.introduction.map((intro, index) => (
          <p key={index} className="text-base-content">
            {formatText(intro)}
          </p>
        )) : ''}
      </div>
    </div>
  );
}

export default ViewIntroductionSection;