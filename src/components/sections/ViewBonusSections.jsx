import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ViewBonusSections({ 
    sheetData, 
    handleYesColorBonus, 
    yesColorBonus, 
    noColorBonus, 
    handleNoColorBonus, 
    handleBonusSliderValues,
    initialYesColor,
    initialNoColor 
  }) {
    return (
        <>
            {
                sheetData.bonusSections && sheetData.bonusSections.length > 0 ? (
                    <div className='mt-10 bg-base-100 p-5 lg:p-5 rounded-lg'>                  
                            {
                                sheetData.bonusSections.map((section, index) => (
                                   
                                    <div
                                    id={`bonus_${index + 1}`}
                                    className='card bg-base-100'
                                    key={index}
                                >
                                    <div className='w-full'>
                                        <div className='w-full'>
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
                                                onClick={() => handleYesColorBonus(index)}
                                                className={
                                                    yesColorBonus[index] ? yesColorBonus[index] : initialYesColor
                                                }>
                                                Yes
                                            </button>
                                            <button
                                                onClick={() => handleNoColorBonus(index)}
                                                className={
                                                    noColorBonus[index] ? noColorBonus[index] : initialNoColor
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
                                                onChange={(e) => handleBonusSliderValues(index, e.target.value, 'mandatory')}
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
                            }
                    </div>
                ) : null
            }
        </>
    );
}

export default ViewBonusSections;