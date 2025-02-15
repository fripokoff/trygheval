import React, { useState, useEffect } from 'react';
import { useGeneralContext } from '../../../contexts/GeneralContext';
import Datepicker from "tailwind-datepicker-react"
import { FaPlus } from 'react-icons/fa';
import { set } from 'react-hook-form';

export default function EditGeneralSection({ options, show, handleClose, handleChange, selectedDate, openModal, sheetData }) {
  let lang = localStorage.getItem("lang");
  if(!lang)
    lang = sheetData?.language ? sheetData.language : 'EN';
  
  if(sheetData?.languages) {
    const langUpper = lang.toUpperCase().trim();
    lang = sheetData.languages.map(l => l.toUpperCase().trim()).includes(langUpper) ? lang :  'EN';
  }
  const {
    introductionData,
    setIntroductionData,
    guidelinesData,
    setGuidelinesData,
    projectTitle,
    setProjectTitle,
    students,
    setStudents,
    evalPoints,
    setEvalPoints,
    time,
    setTime,
    languages,
    setLanguages
  } = useGeneralContext();
  
  const [showNewLangInput, setShowNewLangInput] = useState(false);
  const [newLang, setNewLang] = useState('');

  useEffect(() => {
    if(languages?.length === 0 && !sheetData?.languages)
    {
      setLanguages(['EN']);
    }
    else
    {
      setLanguages(sheetData?.languages);
    }
    const langInSHeet = languages?.length === 0;
    setShowNewLangInput(langInSHeet);
    if(languages?.length > 0 && !languages.includes(lang) && sheetData?.languages?.includes(lang))
      setLanguages([...languages, lang]);
    if(languages?.length > 0)
      sheetData.languages = languages;
    
    localStorage.setItem("lang", lang);



  }, [languages]);

  const handleAddLanguage = () => {
    if (newLang && !languages.includes(newLang.toUpperCase())) {
      const newLangUpper = newLang.toUpperCase();
      const updatedLanguages = [...languages, newLangUpper];

      setLanguages(updatedLanguages);
      localStorage.setItem("lang", newLangUpper);
      lang = newLangUpper;
      setShowNewLangInput(false);
      setNewLang('');

      if (!sheetData?.languages) {
        sheetData.languages = [newLangUpper];
      } else {
        sheetData.languages = [...sheetData.languages, newLangUpper];
      }
    }
  };

  const handleProjectTitle = (e) => {
    setProjectTitle(e.target.value);
  };

  const handleStudents = (e) => {
    setStudents(parseInt(e.target.value, 10));
  };

  const handleEvalPoints = (e) => {
    setEvalPoints(parseInt(e.target.value, 10));
  };

  const handleTime = (e) => {
    setTime(parseInt(e.target.value, 10));
  };

  const handleIntroduction = (e) => {
    setIntroductionData(e.target.value);

  };

  const handleGuidelines = (e) => {
    setGuidelinesData(e.target.value);

  };

  const handleLanguage = (e) => {
    const newLang = e.target.value;
    localStorage.setItem("lang", newLang);
    localStorage.setItem("editMode", 'true');
    window.location.reload();
  }

  
  return (
    <div>
      <div className="bg-base-200 p-6 lg:p-10 rounded-xl general-section">
        <h1 className='text-2xl font-medium text-base-content font-bold'>
          General Information
        </h1>
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* Project Title */}
      
      <div>
        <label htmlFor='project_title' className='block text-lg text-base-content font-bold'>
          Project Title
        </label>
        <input
          type='text'
          id='project_title'
          placeholder='Enter project title'
          value={projectTitle}
          onChange={(e) => handleProjectTitle(e)}
          className='mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
        />
      </div>

      <div>
      <label htmlFor='project_title' className='block text-lg font-bold'>
          Updated at
        </label>
			<Datepicker primaryColor={"fuchsia"} options={options} onChange={handleChange} show={show} setShow={handleClose} value={selectedDate}/>
		</div>

      {/* Students */}
      <div>
        <label htmlFor='students' className='block text-lg text-base-content font-bold'>
          Number of Students
        </label>
        <input
          type='number'
          id='students'
          value={students}
          onChange={(e) => handleStudents(e)}
          className='mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
        />
      </div>

      {/* Eval Points */}
      <div>
        <label htmlFor='eval_points' className='block text-lg text-base-content font-bold'>
          Evaluation Points
        </label>
        <input
          type='number'
          id='eval_points'
          value={evalPoints}
          onChange={(e) => handleEvalPoints(e)}
          className='mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
        />
      </div>

      {/* Time */}
      <div>
        <label htmlFor='time' className='block text-lg text-base-content font-bold'>
          Time (in minutes)
        </label>
        <input
          type='number'
          id='time'
          value={time}
          onChange={(e) => handleTime(e)}
          className='mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
        />
      </div>
      
          <div className="flex">
          {languages && !showNewLangInput && (
            <div className="w-full">
            <label htmlFor='languages1' className='block text-lg text-base-content font-bold'>
              Language
            </label>
            <div className="flex gap-2">
              <select
                className={`mt-1 block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-[#121212] text-gray-700 dark:text-gray-200`}
                value={lang}
                id="languages"
                onChange={(e) => handleLanguage(e)}
              >
                {languages.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
                <button
                    onClick={() => setShowNewLangInput(!showNewLangInput)}
                    className="mt-1 px-3 py-3 bg-base-300 border bg-border-base text-base-content rounded-md hover:bg-base-200"
                  >
                    <FaPlus />
                  </button>
                
            </div>
            
            </div>)}
            {showNewLangInput && (
              <div>
                <label htmlFor='language' className='block text-lg text-base-content font-bold'>
              Add Language
            </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value.toUpperCase())}
                  placeholder="Enter new language code (e.g. EN)"
                  className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm"
                  maxLength={2}
                />
                <button
                  onClick={handleAddLanguage}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  <FaPlus />
                </button>
              </div>
              </div>
            )}
          
          </div>
        

      {/* Introduction section */}
      <div className='sm:col-span-2'
      onClick={() => localStorage.setItem("ActiveSection", `introduction`)}
      >
        <div className="flex justify-between items-center">
          <label htmlFor='introduction' className='block text-xl text-base-content font-bold'>
            Introduction
          </label>
          <button
          type="button"
          onClick={openModal}
          className="ml-2 bg-base-300 text-base-content p-1 rounded-full transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"></path>
            </svg>
          </button>

        </div>
        <textarea
          defaultValue={introductionData?.[lang]}
          rows={10}
          placeholder='Enter introduction text separated by a new line'
          onChange={(e) => handleIntroduction(e)}
          id='introduction'
          required
          className='mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
        />
      </div>

      {/* Guidelines section */}
      <div className='sm:col-span-2'
      onClick={() => localStorage.setItem("ActiveSection", `guidelines`)}
      >
        <div className="flex justify-between items-center">
          <label htmlFor='guidelines' className='block text-xl text-base-content font-bold'>
            Guidelines
          </label>
          <button
          type="button"
          onClick={openModal}
          className="ml-2 bg-base-300 text-base-content p-1 rounded-full transition duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"></path>
            </svg>
          </button>

        </div>
        <textarea
          defaultValue={guidelinesData?.[lang]}
          rows={10}
          placeholder='Enter guidelines text separated by a new line'
          onChange={(e) => handleGuidelines(e)}
          id='guidelines'
          required
          className='mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
        />
      </div>
    </div>
    </div>
    </div>
  );
}