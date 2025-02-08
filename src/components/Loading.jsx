import React, { useEffect, useState } from 'react';

function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-300">
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
    </div>
  );
}

export default Loading;