import { useState, useEffect } from 'react';
import { Code } from 'lucide-react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      <Code size={64} className="text-red-600 animate-pulse mb-8" />
      <div className="w-48 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-red-600 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}