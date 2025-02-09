import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function ViewIntroductionSection({ sheetData }) {
  return (
    <div className='mt-10 bg-base-100 p-5 lg:p-10 rounded-lg' id='introduction'>
      <h2 className='text-2xl font-bold'>
        Introduction
      </h2>
      <p className='pt-2 pb-2'>
        Please follow the rules below:
      </p>

      <div>
        {sheetData?.introduction && typeof sheetData?.introduction === "string" && (
                  <div className='w-full'>
                      <ReactMarkdown
                        className="prose prose-stone w-full max-w-none"
                        children={sheetData.introduction.replace(/\n/g, '  \n')}
                        remarkPlugins={[remarkGfm]}
                      />
                  </div>
                )}
      </div>
    </div>
  );
}

export default ViewIntroductionSection;