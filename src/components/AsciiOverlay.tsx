
import React from 'react';

const AsciiOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none overflow-hidden opacity-20">
      <pre className="text-[0.5rem] leading-[0.5rem] text-white font-mono whitespace-pre">
        {Array(30).fill(0).map((_, i) => (
          <div key={i} className="whitespace-nowrap">
            {Array(100).fill(0).map((_, j) => {
              // Create a pattern of symbols
              const index = (i * 100 + j) % 7;
              let char = ' ';
              if (index === 0) char = '.';
              if (index === 1) char = '*';
              if (index === 2) char = '+';
              if (index === 3) char = ':';
              if (index === 4) char = '|';
              if (index === 5) char = '/';
              if (index === 6) char = '\\';
              return char;
            }).join('')}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default AsciiOverlay;
