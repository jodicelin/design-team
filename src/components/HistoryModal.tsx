
import React from 'react';
import type { DrawRecord } from '../types';
import { ClipboardList, X } from 'lucide-react';

interface HistoryModalProps {
  records: DrawRecord[];
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ records, onClose }) => {
  const borderStyle = "border-2 border-black";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm font-rounded">
      <div 
        className={`relative w-full max-w-[400px] h-[80vh] bg-white ${borderStyle} rounded-3xl flex flex-col shadow-[8px_8px_0px_0px_#4587ff] animate-pop-in overflow-hidden`}
      >
        {/* Header */}
        <div className="bg-pop-blue border-b-2 border-black p-4 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
                <ClipboardList className="text-white drop-shadow-md" size={28} strokeWidth={2.5} />
                <h2 className="text-2xl font-black text-white tracking-widest drop-shadow-md">抽籤紀錄</h2>
            </div>
            <button 
                onClick={onClose}
                className="bg-white border-2 border-black rounded-full p-1 hover:bg-gray-100 transition-colors"
            >
                <X size={20} />
            </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-pop-bg">
            {records.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                    <ClipboardList size={48} strokeWidth={1.5} />
                    <p className="font-bold text-lg">目前沒有紀錄</p>
                </div>
            ) : (
                records.map((record) => (
                    <div 
                        key={record.id}
                        className="bg-white border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_rgba(0,0,0,0.1)] flex items-center justify-between"
                    >
                        <div className="flex flex-col">
                             <span className="text-xs font-bold text-gray-500 mb-0.5">PLAYER</span>
                             <span className="text-lg font-black text-pop-blue">{record.playerName}</span>
                        </div>
                        <div className="flex flex-col items-end">
                             <span className="text-xs font-bold text-gray-500 mb-0.5">CHARACTER</span>
                             <span className="text-lg font-black text-black">{record.characterName}</span>
                        </div>
                    </div>
                ))
            )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 border-black bg-white shrink-0">
             <div className="text-center font-bold text-sm text-gray-400">
                 共 {records.length} 筆資料
             </div>
        </div>

      </div>
    </div>
  );
};
