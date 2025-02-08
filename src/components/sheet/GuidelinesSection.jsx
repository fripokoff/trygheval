import React from 'react';

function GuidelinesSection({ sheetData, formatText }) {
  return (
    <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg'>
      <h2 className='text-2xl font-bold'>
        Guidelines
      </h2>
      <p className='pt-2 pb-7'>
        Please follow the guidelines below:
      </p>

      <div className="pt-5">
        {sheetData.guidelines ? sheetData.guidelines.map((guideline, index) => (
          <p className="pb-5" key={index}>
            {formatText(guideline)}
          </p>
        )) : ''}
      </div>
    </div>
  );
}

export default GuidelinesSection;