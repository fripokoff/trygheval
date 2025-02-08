import { useSectionContext } from '../../context/SectionContext';
import { usePreliminarySections } from '../../hooks/usePreliminarySections';
import { useEffect } from "react";

export default function PreliminarySection({ sheetData, openModal }) {
  const {
    preliminarySections,
    preliminarySectionsDataFromServer,
    numberOfPreliminarySections,
    updatePreliminarySection,
    updatePreliminaryIntro
  } = useSectionContext();
  
  const { addPreliminarySection, removePreliminarySection } = usePreliminarySections();
  
  const handlePreliminaryIntroduction = (e) => {
    updatePreliminaryIntro(e);
  };

  return (
    <div className="flex flex-col p-4 lg:p-5 rounded-xl gap-5 mt-10 bg-base-200 prelimary-section">
      <div className="flex justify-between items-center">
        <h1 className='text-2xl font-medium text-base-content font-bold'>
          Preliminary Part
        </h1>
        {numberOfPreliminarySections === 0 && (
          <button 
            type='button' 
            onClick={addPreliminarySection} 
            className='bg-base-300 text-base-content py-3 px-5 rounded-md transition duration-200'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        )}
      </div>
      
      
      {/* Preliminary introduction */}
      <div className='mb-2 mt-4'>
            <label htmlFor='preliminary_intro' className='block text-sm text-base-content font-bold'>
                Introduction:
            </label>
            <input
                defaultValue={sheetData?.preliminaryIntro || ''}
                placeholder='Enter a preliminary introduction (optional)'
                type='text'
                id={`preliminary_intro`}
                className='block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
                onChange={(e) => handlePreliminaryIntroduction(e)}
            />
          </div>
      {preliminarySections.map((section, index) => (
        <div key={section.id} className='mt-5 bg-base-300 p-6 rounded-xl'>
          {/* Contenu de la section */}
          <div className='mt-3 mb-7 flex justify-between items-center'>
            <h1 className='text-xl font-medium text-base-content'>
              Preliminary Section {section.index + 1}
            </h1>
            <button 
              onClick={() => removePreliminarySection(section.index)}
              className='text-red-500 hover:text-red-700 transition-colors'
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>

          {/* Title */}
          <div className='mb-2 mt-4'>
            <label htmlFor='preliminary_title' className='block text-sm text-base-content font-bold'>
              Title of the evaluation criteria:
            </label>
            <input
              defaultValue={preliminarySectionsDataFromServer[section.index]?.title || ''}
              placeholder='Enter a title'
              type='text'
              id={`preliminary_title_${section.index}`}
              className='block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
              onChange={(e) => updatePreliminarySection(index, { title: e.target.value })}
            />
          </div>

          {/* Subtitle */}
           <div className='mb-2 mt-4'>
            <label htmlFor='preliminary_subtitle' className='block text-sm text-base-content font-bold'>
                Subtitle:
            </label>
            <input
                defaultValue={preliminarySectionsDataFromServer[index]?.subtitle || ''}
                placeholder='Enter a subtitle (optional)'
                type='text'
                id={`preliminary_subtitle_${section.index}`}
                className='block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
                onChange={(e) => updatePreliminarySection(index, { subtitle: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className='mb-2 mt-4'>
            <div className="flex justify-between items-center font-bold">
                <label htmlFor='preliminary_description' className='block text-sm text-base-content'>
                    Detailed description:
                </label>
                <button
                    onClick={openModal}
                    type='button' 
                    className='ml-2 bg-base-300 text-base-content p-1 rounded-full transition duration-200'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                </button>
            </div>

            <textarea
                defaultValue={preliminarySectionsDataFromServer[index]?.description || ''}
                rows={5}
                placeholder='Enter detailed description separated by a new line'
                id={`preliminary_description_${section.index}`}
                className='block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
                onChange={(e) => updatePreliminarySection(index, { description: e.target.value })}
            />
            <p className='mt-2 text-sm text-red-700'>NOTE: Please separate each description with a new line</p>
          </div>
        {/* Conclusion */}
          <div className='mb-2 mt-4'>
            <label htmlFor='preliminary_conclusion' className='block text-sm text-base-content font-bold'>
              Conclusion:
            </label>
            <input
                defaultValue={preliminarySectionsDataFromServer[index]?.conclusion || ''}
                placeholder='Enter a conclusion (optional)'
                type='text'
                id={`preliminary_conclusion_${section.index}`}
                className='block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
                onChange={(e) => updatePreliminarySection(index, { conclusion: e.target.value })}
            />
          </div>

          {/* Yes/No Selection */}
          <div className='mb-2 mt-4 font-bold text-base-content'>
            <label htmlFor='preliminary_yes_no' className='block text-sm'>
                Yes/No button or slider:
            </label>
            <select
                defaultValue={!preliminarySectionsDataFromServer[index] ? 'true' : preliminarySectionsDataFromServer[index]?.yes_no === true ? 'true' : 'false'}
                id={`preliminary_yes_no_${section.index}`}
                className='block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none bg-base-300 focus:border-blue-500 sm:text-sm'
                onChange={(e) => updatePreliminarySection(index, { yes_no: e.target.value === 'true' })}
            >
                <option value={null}>Select one</option>
                <option value={true}>Yes/No button</option>
                <option value={false}>Slider with value</option>
            </select>
          </div>
        </div>
      ))}

      {numberOfPreliminarySections > 0 && (
        <div className="flex justify-center w-full p-4 bg-base-300 text-base-content rounded-md mb-2 border border-green-500 cursor-pointer"
        onClick={addPreliminarySection} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          <span className='ml-2'>Add Preliminary section</span>
        </div>
      )}
    </div>
  );
}