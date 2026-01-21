import React from 'react';

import type { Feedback } from '@/types';

interface FeedbackAlertProps {
  feedback: Feedback | null;
}

const FeedbackAlert = ({ feedback }: FeedbackAlertProps) => {
  if (!feedback) return null;

  return (
    <div
      className={`
        mx-4 mb-4 p-4 rounded-xl text-center font-bold text-lg animate-in fade-in slide-in-from-bottom-4 duration-300
        ${feedback.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : ''}
        ${feedback.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : ''}
        ${feedback.type === 'info' ? 'bg-blue-50 text-blue-600 border border-blue-100' : ''}
      `}
    >
      {feedback.msg}
    </div>
  );
};

export default FeedbackAlert;
