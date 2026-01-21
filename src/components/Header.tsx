import React from 'react';
import { MousePointer2 } from 'lucide-react';

import type { Difficulty, Topic } from '@/types';

interface HeaderProps {
  topic: Topic;
  difficulty: Difficulty;
  onTopicChange: (topic: Topic) => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const Header = ({ topic, difficulty, onTopicChange, onDifficultyChange }: HeaderProps) => (
  <div className="bg-blue-600 p-4 text-white">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <MousePointer2 className="w-6 h-6" />
        9x9 幾何釘板
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 bg-blue-700/50 p-2 rounded-lg">
        <div className="flex bg-blue-800 rounded-lg p-1">
          <button
            onClick={() => onTopicChange('triangle')}
            className={`px-3 py-1 rounded-md text-sm font-bold transition ${
              topic === 'triangle'
                ? 'bg-white text-blue-800 shadow-sm'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            三角形
          </button>
          <button
            onClick={() => onTopicChange('quad')}
            className={`px-3 py-1 rounded-md text-sm font-bold transition ${
              topic === 'quad' ? 'bg-white text-blue-800 shadow-sm' : 'text-blue-200 hover:text-white'
            }`}
          >
            四邊形
          </button>
        </div>

        <div className="hidden sm:block w-px bg-blue-500/50 mx-1"></div>

        <div className="flex bg-blue-800 rounded-lg p-1">
          <button
            onClick={() => onDifficultyChange('easy')}
            className={`px-3 py-1 rounded-md text-sm font-bold transition ${
              difficulty === 'easy'
                ? 'bg-green-400 text-green-900 shadow-sm'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            容易
          </button>
          <button
            onClick={() => onDifficultyChange('hard')}
            className={`px-3 py-1 rounded-md text-sm font-bold transition ${
              difficulty === 'hard'
                ? 'bg-orange-400 text-orange-900 shadow-sm'
                : 'text-blue-200 hover:text-white'
            }`}
          >
            困難
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Header;
