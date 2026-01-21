import React from 'react';
import { ArrowRight, Check, Trash2 } from 'lucide-react';

interface ControlsProps {
  onReset: () => void;
  onNextQuestion: () => void;
  onValidate: () => void;
  canSubmit: boolean;
}

const Controls = ({ onReset, onNextQuestion, onValidate, canSubmit }: ControlsProps) => (
  <div className="flex flex-col gap-4 w-full lg:w-64">
    <div className="bg-slate-50 p-4 rounded-lg text-sm border border-slate-200">
      <p className="font-bold text-slate-700 mb-2">操作說明：</p>
      <ul className="list-disc list-inside text-slate-600 space-y-1">
        <li>點擊一點開始拉線</li>
        <li>再次點擊固定線條</li>
        <li>線條無法個別刪除</li>
        <li>如需修改請按「全部重置」</li>
      </ul>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <button
        onClick={onReset}
        className="col-span-1 flex flex-col items-center justify-center p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:text-red-500 transition"
      >
        <Trash2 size={20} className="mb-1" />
        <span className="text-xs font-bold">全部重置</span>
      </button>

      <button
        onClick={onNextQuestion}
        className="col-span-1 flex flex-col items-center justify-center p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 hover:text-blue-500 transition"
      >
        <ArrowRight size={20} className="mb-1" />
        <span className="text-xs font-bold">下一題</span>
      </button>
    </div>

    <button
      onClick={onValidate}
      disabled={!canSubmit}
      className="w-full py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 shadow-lg shadow-green-200 active:scale-95 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      <Check size={24} /> 提交答案
    </button>
  </div>
);

export default Controls;
