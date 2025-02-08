import { useAttachmentContext } from '../../context/AttachmentContext';
import { useAttachments } from '../../hooks/useAttachments';

export default function AttachmentSection() {
  const { attachments } = useAttachmentContext();
  const { addAttachment, removeAttachment, updateAttachment } = useAttachments();

  const handleTitleChange = (index, newTitle) => {
    updateAttachment(index, { title: newTitle });
  };

  const handleUrlChange = (index, newUrl) => {
    updateAttachment(index, { url: newUrl });
  };

  return (
    <div className="flex flex-col p-4 lg:p-5 rounded-xl mt-10 bg-base-200 attachment-section">
      <div className="flex justify-between items-center">
        <h1 className='text-2xl font-medium text-base-content font-bold'>
          Attachments
        </h1>
        {attachments.length === 0 && (
        <button
          type="button"
          onClick={() => addAttachment('', '')}
          className='bg-base-300 text-base-content py-3 px-5 rounded-md'
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
        )}
      </div>

      <div className="flex flex-col justify-start sm:flex-row sm:flex-wrap">
        {attachments.map((attachment, index) => (
          <div
            key={attachment.id}
            className='w-full sm:w-2/5 p-4 rounded-xl bg-base-300 text-base-content mb-4 mr-4'
          >
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-medium'>Attachment {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeAttachment(index)}
                className='text-red-500 hover:text-red-700'
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>

            <div className='flex flex-col lg:flex-row gap-1 '>
              <div className='w-full'>
                <label className='block text-sm text-gray-500 mb-1'>
                  Title:
                </label>
                <input
                  value={attachment.title}
                  placeholder='Enter attachment title'
                  type='text'
                  className='block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
                  onChange={(e) => handleTitleChange(index, e.target.value)}
                />
              </div>

              <div className='w-full'>
                <label className='block text-sm text-gray-500 mb-1'>
                  URL:
                </label>
                <input
                  value={attachment.url}
                  placeholder='Enter attachment URL'
                  type='text'
                  className='block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 sm:text-sm'
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {attachments.length > 0 && (
        <div className="flex justify-center w-full p-4 bg-base-300 text-base-content rounded-md mb-2 border border-green-500 cursor-pointer"
        onClick={() => addAttachment('', '')} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          <span className='ml-2'>Add Attachments</span>
        </div>
      )}

    </div>
  );
}