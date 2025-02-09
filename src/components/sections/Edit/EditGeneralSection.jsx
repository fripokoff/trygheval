import React, { useEffect } from 'react';
import { useGeneralContext } from '../../../contexts/GeneralContext';
import Datepicker from "tailwind-datepicker-react"

export default function EditGeneralSection({ options, show, handleClose, handleChange, selectedDate, openModal }) {
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
  } = useGeneralContext();

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
  const introduction= "- Remain polite, courteous, respectful, and constructive throughout the evaluation process. The community's well-being depends on it.,\n- Work with the student or group being evaluated to identify potential issues in their project. Take time to discuss and debate the problems identified.\n- Understand that there may be differences in how peers interpret the project instructions and scope. Always keep an open mind and grade as honestly as possible. Pedagogy is effective only when peer evaluations are taken seriously.";
	const guidelines = "- Only grade the work submitted to the **Git repository** of the evaluated student or group.\n- Double-check that the **Git repository** belongs to the student(s) and that the project is the one expected. Ensure that **git clone** is used in an empty folder.\n- Carefully verify that no malicious aliases are used to deceive the evaluator into grading non-official content.\n- If applicable, review any **scripts** used for testing or automation together with the student.\n- If you haven’t completed the assignment you’re evaluating, read the entire subject before starting the evaluation.,\n- Use the available flags to report an empty repository, a non-functioning program, a **Norm** error, or cheating. The evaluation process ends with a final grade of 0 (or -42 for cheating). However, except in cases of cheating, students are encouraged to review the work together to identify mistakes to avoid in the future.\n- Remember that no **segfaults** or other unexpected program terminations will be tolerated during the evaluation. If this occurs, the final grade is 0. Use the appropriate flag.\n You should not need to edit any files except the configuration file, if it exists. If editing a file is necessary, explain the reasons to the evaluated student and ensure mutual agreement.\n- Verify the absence of **memory leaks.** All memory allocated on the heap must be properly freed before the program ends.\n- You may use tools like leaks, **valgrind,** or **e_fence** to check for memory leaks. If memory leaks are found, tick the appropriate flag.";

  useEffect(() => {
    setIntroductionData(introduction);
    setGuidelinesData(guidelines);
  }, [setIntroductionData, setGuidelinesData]);

  
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
      {/* {project?.languages && (
        <div>
        <label htmlFor='language' className='block text-lg text-base-content font-bold'>
        Language
        </label>
        <select
          className={`mt-1 block w-full px-3 py-3 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 sm:text-sm bg-white dark:bg-[#121212] text-gray-700 dark:text-gray-200`}
          value={1}
          id={1}
          onChange={(e) => handleTime(e)}
        >
          <option value="border-t-[0.5px]">US</option>
          <option value="border-t-1">FR</option>
        </select>
      </div>
      )} */}

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
          defaultValue={introductionData}
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
          defaultValue={guidelinesData}
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