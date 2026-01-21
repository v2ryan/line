import React from 'react';
import { Info } from 'lucide-react';

import type { Difficulty, Question } from '@/types';

interface QuestionDisplayProps {
  question: Question;
  difficulty: Difficulty;
}

const QuestionDisplay = ({ question, difficulty }: QuestionDisplayProps) => (
  <div className="mb-6 bg-slate-100 p-4 rounded-lg border-l-4 border-blue-500 flex justify-between items-start gap-4">
    <div>
      <h2 className="font-bold text-lg mb-1 text-slate-800 flex items-center gap-2">
        題目
        <span
          className={`text-xs px-2 py-0.5 rounded-full border ${
            difficulty === 'easy'
              ? 'bg-green-100 text-green-700 border-green-200'
              : 'bg-orange-100 text-orange-700 border-orange-200'
          }`}
        >
          {difficulty === 'easy' ? '容易' : '困難'}
        </span>
      </h2>
      <p className="text-lg text-slate-700 font-medium">{question.text}</p>
      {question.hint && (
        <p className="text-sm text-slate-500 mt-2 flex items-center gap-1">
          <Info className="w-4 h-4" /> 提示：{question.hint}
        </p>
      )}
    </div>
  </div>
);

export default QuestionDisplay;
