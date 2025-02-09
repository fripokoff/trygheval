import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ViewGuidelinesSection({ sheetData }) {
  return (
    <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg' id="guidelines">
      <h2 className='text-2xl font-bold'>
        Guidelines
      </h2>
      <p className='pt-2 pb-2'>
        Please follow the guidelines below:
      </p>

      <div>
        {sheetData?.guidelines && typeof sheetData?.guidelines === "string" && (
          <div className='w-full'>
              <ReactMarkdown
                className="prose prose-stone w-full max-w-none"
                children={sheetData.guidelines.replace(/\n/g, '  \n')}
                remarkPlugins={[remarkGfm]}
              />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewGuidelinesSection;