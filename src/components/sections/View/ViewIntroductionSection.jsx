import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ViewIntroductionSection({ sheetData }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [title, setTitle] = useState('');
  const [fullContent, setFullContent] = useState('');

  let lang = localStorage.getItem("lang");
  if(!lang)
    sheetData?.language ? lang = sheetData.language : lang = 'EN';

  useEffect(() => {
    if (sheetData?.introduction?.[lang]) {
      const content = sheetData.introduction[lang];
      const lines = content.split('\n');
      const firstLine = lines[0];
      setTitle(firstLine);
      setFullContent(content);
    }
  }, [sheetData, lang]);

  if(sheetData.introduction && sheetData?.project_title?.toLowerCase().includes('exam'))
  {
    return (
      <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg' id='introduction'>
        <div className='w-full'>
          <div className="flex items-center cursor-pointer" onClick={() => setIsCollapsed(!isCollapsed)}>
            
            <ReactMarkdown
              className="prose prose-stone w-full max-w-none"
              children={title}
              remarkPlugins={[remarkGfm]}
            />
            <svg 
              className={`w-6 h-6 transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {!isCollapsed && (
            <div className="mt-4">
              <ReactMarkdown
                className="prose prose-stone w-full max-w-none"
                children={fullContent.replace(/\n/g, '  \n').replace(title, '')}
                remarkPlugins={[remarkGfm]}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
  
  return sheetData?.introduction && sheetData?.introduction?.[lang] ? (
    <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg' id='introduction'>
      <div className='w-full'>
        <ReactMarkdown
          className="prose prose-stone w-full max-w-none"
          children={sheetData.introduction[lang].replace(/\n/g, '  \n')}
          remarkPlugins={[remarkGfm]}
        />
      </div>
    </div>
  ) : null;
}

export default ViewIntroductionSection;