import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLocation } from 'react-router-dom';

function ViewMandatorySections({ sheetData, handleYesColor, handleNoColor, mandatoryYesColor, mandatoryNoColor, initialYesColor, initialNoColor, handleMandatorySliderValues, editMode, setLastMandatorySection }) {

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg'>
      <h2 className='text-2xl font-bold'>
        Mandatory Part
      </h2>
      {sheetData.mandatoryIntro && (
        <p className='pt-3 pb-3 italic'>
          {sheetData.mandatoryIntro}
        </p>
      )}
      <div className='pt-5'>
        {
          sheetData.mandatorySections && sheetData.mandatorySections.length > 0 ? (
            sheetData.mandatorySections.map((section, index) => (
              <div
                id={`mandatory_${index + 1}`}
                className='card bg-base-100'
                key={index}
              >
                <div className='w-full'>
                  <div className='pt-2 w-full'>
                    <ReactMarkdown
                      className="prose prose-stone w-full max-w-none"
                      children={section.description.replace(/\n/g, '  \n')}
                      remarkPlugins={[remarkGfm]}
                    />
                  </div>
                </div>
                <div className='flex gap-1 items-center w-full mt-4'>
                  {section.yes_no ? (
                    <div className='flex gap-1 items-center w-full'>
                    <button
                        onClick={() => handleYesColor(index)}
                        className={
                            mandatoryYesColor[index] ? mandatoryYesColor[index] : initialYesColor
                        }>
                        Yes
                    </button>
                    <button
                        onClick={() => handleNoColor(index)}
                        className={
                            mandatoryNoColor[index] ? mandatoryNoColor[index] : initialNoColor
                        }>
                        No
                    </button>
                </div>
                  ) : (
                    <div className='w-full mx-auto'>
                      <p className='text-sm font-medium text-center pb-2'>
                        Rate it from 0 (failed) through 5 (excellent)
                      </p>
                      <input
                        onChange={(e) => handleMandatorySliderValues(index, e.target.value, 'mandatory')}
                        type="range" defaultValue={0} min={0} max={100} className="range range-info" step={20} />
                      <div className="flex w-full justify-between px-2 text-xs">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                      </div>
                    </div>

                  )}
                </div>
                {section?.separator && (<hr className='mt-4 mb-4' />)}
              </div>
            ))
          ) : null
        }
      </div>
    </div>
  );
}

export default ViewMandatorySections;