import { useLoading } from '../../contexts/LoadingContext';

function Loading() {
  const { isLoading } = useLoading();


  const getProjectName = () => {
    const hash = window.location.hash;
    const queryString = hash.split('?')[1] || '';
    const params = new URLSearchParams(queryString);
    return params.get('project');
  };


  const getProjectImagePath = (projectName) => {

    return `sheets/${projectName}/logo.png`;
  };

  if (!isLoading) return null;

  const projectName = getProjectName();
  const imagePath = projectName ? getProjectImagePath(projectName) : null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base-300">
      <style>{`
        .loader span {
          display: inline-block;
          animation: pulse 0.4s alternate infinite ease-in-out;
        }
        .loader span:nth-child(odd) {
          animation-delay: 0.4s;
        }
        @keyframes pulse {
          to {
            transform: scale(0.8);
            opacity: 0.5;
          }
        }
      `}</style>
      <div className="loader text-7xl font-mono font-bold text-base-content opacity-80">
        <span>{'{42'}</span><span>{'COR}'}</span>
      </div>
      {projectName && (
        <>
          <div className="flex flex-col justify-center items-center mt-4 text-2xl font-mono text-base-content opacity-80">
            <span>Loading project :</span>
            <span> {projectName.toUpperCase()}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Loading;