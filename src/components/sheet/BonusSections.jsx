import React from 'react';

function BonusSections({ 
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
                    <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg'>
                        <h2 className='text-2xl font-bold'>
                            Bonus Part
                        </h2>
                        {sheetData.bonusIntro && (
                        <p className='pt-3 pb-3 italic'>
                             {sheetData.bonusIntro}     
                        </p>
                        )}                    
                        <div className='pt-5'>
                            {
                                sheetData.bonusSections.map((section, index) => (
                                    <div style={{ borderRadius: '20px', border: '3px solid #eeeeee' }} className='card bg-base-100 p-5 rounded-lg mb-5' key={index}>
                                        <h3 className='text-xl font-bold pb-3'>
                                            {section.title}
                                        </h3>

                                        {section.subtitle ? (<p className='pt-3 pb-5'>
                                            {section.subtitle}
                                        </p>) : null}

                                        <div className='pt-2'>
                                            {
                                                section.description.split('\n').map((line, index) => (
                                                    <p key={index} className='pb-5'>
                                                        {line}
                                                    </p>
                                                ))
                                            }
                                        </div>

                                        {section.conclusion ? (<p className='pt-3 pb-5'>
                                            {section.conclusion ? section.conclusion : ''}
                                        </p>) : null}
                                        {
                                            section.yes_no ? (
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
                                                <div className='w-full lg:w-1/2 mx-auto mt-7'>
                                                    <p className='text-sm font-medium text-center pb-2'>
                                                        Rate it from 0 (failed) through 5 (excellent)
                                                    </p>
                                                    <input
                                                        onChange={(e) => handleBonusSliderValues(index, e.target.value)}
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
                                            )
                                        }


                                    </div>
                                ))


                            }
                        </div>
                    </div>
                ) : null
            }
        </>
    );
}

export default BonusSections;