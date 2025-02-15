import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '../../CodeBlock';
import rehypeSlug from 'rehype-slug';
import { useNavigate } from 'react-router-dom';

import './ViewMandatorySections.css';

function ViewMandatorySections({ 
  sheetData, 
  handleYesColor, 
  handleNoColor, 
  mandatoryYesColor, 
  mandatoryNoColor, 
  initialYesColor, 
  initialNoColor, 
  handleMandatorySliderValues, 
  isNotExam 
}) {
  let lang = localStorage.getItem("lang");
  if(!lang)
    sheetData?.language ? lang = sheetData.language : lang = 'EN';

  const parseExercisesFromMarkdown = (content) => {
    const exercises = [];
    const lines = content.split('\n');
    let isInExerciseTable = false;
    
    for (const line of lines) {
      if (line.includes('Level') || line.includes('Niveau')) {
        isInExerciseTable = true;
        continue;
      }
      if (line.includes('|-')) {
        continue;
      }
      if (isInExerciseTable && line.trim().startsWith('|')) {
        const columns = line.split('|').map(col => col.trim()).filter(col => col);
        columns.forEach(col => {
          const exercise = col.trim();
          if (exercise && exercise !== '' && !exercise.includes('Level') && !exercise.includes('Niveau')) {
            exercises.push(exercise);
          }
        });
      }
    }
    
    return exercises;
  };

  const handleExerciseClick = (exercises, exerciseName) => {
    const element = document.getElementById(exerciseName);
    const index = exercises.indexOf(exerciseName);
    const mandatorySectionElement = document.getElementById(`mandatory_section_${index + 2}`);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    if(mandatorySectionElement)
    {
      mandatorySectionElement.classList.add('glowing-border');
      setTimeout(() => {
        mandatorySectionElement.classList.remove('glowing-border');
      }, 2000);
      }
  };

  return (
    <>
      {sheetData.mandatorySections && sheetData.mandatorySections.length > 0 ? (
        <div className='mt-10 bg-base-100 p-5 lg:p-5 rounded-lg'>
          {sheetData.mandatorySections.map((section, index) => (
            <div
              id={`mandatory_section_${index + 1}`}
              className='card bg-base-100'
              key={index}
            >
              <div className='w-full'>
                <div className="markdown-container">
                  <ReactMarkdown
                    className="prose prose-stone w-full max-w-none"
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSlug]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <CodeBlock language={match[1]}>
                            {String(children)}
                          </CodeBlock>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                      table: ({ node, ...props }) => (
                        <div className="overflow-x-auto">
                          <table className="table table-zebra w-full" {...props} />
                        </div>
                      ),
                      td: ({ children, ...props }) => {
                        const content = String(children).trim();
                        const exercises = parseExercisesFromMarkdown(section.description?.[lang].replace(/\n/g, '  \n'));
                        const isExercise = exercises.includes(content);

                        return (
                          <td {...props}>
                            {isExercise ? (
                              <button
                                className="text-blue-500 hover:text-blue-700 underline"
                                onClick={() => handleExerciseClick(exercises, content)}
                              >
                                {children}
                              </button>
                            ) : (
                              children
                            )}
                          </td>
                        );
                      }
                    }}
                  >
                    {section.description?.[lang].replace(/\n/g, '  \n')}
                  </ReactMarkdown>
                </div>
              </div>
              <div className='flex gap-1 items-center w-full mt-4'>
                {isNotExam && section.yes_no ? (
                  <div className='flex gap-1 items-center w-full'>
                    <button
                      onClick={() => handleYesColor(index)}
                      className={mandatoryYesColor[index] ? mandatoryYesColor[index] : initialYesColor}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleNoColor(index)}
                      className={mandatoryNoColor[index] ? mandatoryNoColor[index] : initialNoColor}
                    >
                      No
                    </button>
                  </div>
                ) : isNotExam && (
                  <div className='w-full mx-auto'>
                    <p className='text-sm font-medium text-center pb-2'>
                      Rate it from 0 (failed) through 5 (excellent)
                    </p>
                    <input
                      onChange={(e) => handleMandatorySliderValues(index, e.target.value, 'mandatory')}
                      type="range"
                      defaultValue={0}
                      min={0}
                      max={100}
                      className="range range-info"
                      step={20}
                    />
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
              {section?.separator && (<hr className={`mt-4 mb-4 ${section.separator}`} />)}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}

export default ViewMandatorySections;