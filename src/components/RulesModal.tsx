
import React from 'react';
import { TextMagnifier } from './TextMagnifier';
import { X } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  const borderStyle = "border-2 border-black";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm font-rounded cursor-magnify">
      {/* Modal Container */}
      <div 
        className={`relative w-full max-w-[600px] max-h-[90vh] bg-white ${borderStyle} rounded-3xl flex flex-col shadow-[8px_8px_0px_0px_#ff4006] animate-pop-in overflow-hidden`}
      >
        
        {/* Header */}
        <div className="flex justify-between items-center w-full border-b-2 border-black p-4 bg-white shrink-0 z-10">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-black tracking-widest">遊戲規則</h2>
              <span className="text-2xl">🎮</span>
            </div>
            <button 
                onClick={onClose}
                className="bg-gray-100 border-2 border-black rounded-full p-1 hover:bg-gray-200 transition-colors"
            >
                <X size={24} />
            </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto bg-white">
          <TextMagnifier lensSize={200} zoomScale={1.8}>
            <div className="flex flex-col gap-6 text-black font-bold text-base leading-relaxed p-6 bg-white">
                
                {/* Step 1 */}
                <div className="flex items-start gap-3">
                    <span className="bg-pop-red text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-black shrink-0 border-2 border-black shadow-[2px_2px_0px_#000]">1</span>
                    <div className="flex flex-col gap-1">
                        <p className="text-lg">請把你的大名輸入機台，然後用力點擊機台搖桿</p>
                        <p className="text-gray-500 text-sm">啟動命運的轉輪</p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3">
                    <span className="bg-pop-blue text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-black shrink-0 border-2 border-black shadow-[2px_2px_0px_#000]">2</span>
                    <div className="flex flex-col gap-1">
                        <p className="text-lg">等待宇宙雜訊掃描</p>
                        <p className="text-gray-500 text-sm">現在你只是個普通人，三秒後你將變成宇宙級的八卦探員。</p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3">
                    <span className="bg-pop-green text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-black shrink-0 border-2 border-black shadow-[2px_2px_0px_#000]">3</span>
                    <div className="flex flex-col gap-1">
                        <p className="text-lg">命運轉盤會告訴你：</p>
                        <p className="text-pop-blue text-lg">「恭喜你，你這局要去調查 那位神秘生物。」</p>
                    </div>
                </div>

                 {/* Step 4 */}
                <div className="flex items-start gap-3">
                    <span className="bg-pop-yellow text-black w-8 h-8 rounded-full flex items-center justify-center text-lg font-black shrink-0 border-2 border-black shadow-[2px_2px_0px_#000]">4</span>
                    <div className="flex flex-col gap-2">
                        <p className="text-lg">開始你的變態式情報蒐集之旅。</p>
                        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                            <li>偷偷觀察、暗中跟蹤、側耳偷聽……</li>
                            <li>或向他身邊的人打聽一切資訊：「欸他是不是喜歡喝熱水？」</li>
                        </ul>
                        <div className="bg-red-50 border-l-4 border-pop-red p-2 mt-1">
                            <p className="text-pop-red text-sm font-black">重點：千萬不能讓本人知道你在查他！</p>
                            <p className="text-xs text-gray-500">（被抓包你會瞬間變成宇宙最遜八卦仔。）</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg border-2 border-black border-dashed mt-1">
                            <p className="text-sm font-black mb-1">查什麼都可以：</p>
                            <ul className="list-disc pl-5 text-xs text-gray-600 space-y-1">
                                <li>最愛的顏色</li>
                                <li>假日都在幹嘛</li>
                                <li>深夜 Google 搜尋紀錄（如果查得到你就神了）</li>
                                <li>家族族譜、上一代的上一代的上一代叫什麼</li>
                                <li>願聞其詳，全都算分</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Step 5 */}
                <div className="flex items-start gap-3">
                    <span className="bg-pop-pink text-black w-8 h-8 rounded-full flex items-center justify-center text-lg font-black shrink-0 border-2 border-black shadow-[2px_2px_0px_#000]">5</span>
                    <div className="flex flex-col gap-1">
                        <p className="text-lg">請記得紀錄情報來源！</p>
                        <p className="text-gray-500 text-sm">因為等一下有人得分、有人翻臉，全靠這步。</p>
                    </div>
                </div>

                {/* Step 6 */}
                <div className="flex items-start gap-3">
                    <span className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center text-lg font-black shrink-0 border-2 border-white shadow-[2px_2px_0px_#000]">6</span>
                    <div className="flex flex-col gap-2">
                        <p className="text-lg">當有人來問你情報時…你的靈魂將被分成兩半：</p>
                        <div className="text-sm bg-gray-100 p-3 rounded-lg border-2 border-black">
                            <p className="mb-2"><span className="text-pop-green font-black text-base">😇 善良天使版你：</span><br/>提供正確情報，助人為樂。</p>
                            <p><span className="text-pop-red font-black text-base">😈 邪惡小惡魔版你：</span><br/>亂掰一個，讓世界大亂。</p>
                        </div>
                        <p className="text-sm font-bold">不管你選哪邊，你都會積分。</p>
                        <p className="text-xs text-gray-400">（對，就是那麼鼓勵大家搞事。）</p>
                    </div>
                </div>

                <hr className="border-2 border-black border-dashed my-2" />

                {/* AWARDS SECTION */}
                <div>
                    <h3 className="text-2xl font-black text-center mb-6 flex items-center justify-center gap-3 bg-pop-yellow border-2 border-black py-2 transform -rotate-1 shadow-[4px_4px_0px_#000]">
                    <span>🏆</span> 獎項 <span>🏆</span>
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                    {/* Award 1 */}
                    <div className="bg-green-50 border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_#000] relative">
                        <div className="absolute -top-3 -left-2 bg-pop-green text-white text-xs font-black px-2 py-1 border-2 border-black rounded">GOOD</div>
                        <h4 className="font-black text-pop-green text-xl mb-1">🍀 1. 好人好事獎</h4>
                        <p className="text-sm text-gray-700 font-medium">你是真的好人。提供最多正確情報的人獲得。</p>
                        <div className="mt-3 bg-white border-2 border-black rounded-lg px-3 py-1 inline-block text-sm font-black shadow-sm">
                        🎁 星巴克券 x1
                        </div>
                    </div>

                    {/* Award 2 */}
                    <div className="bg-blue-50 border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_#000] relative">
                        <div className="absolute -top-3 -left-2 bg-pop-blue text-white text-xs font-black px-2 py-1 border-2 border-black rounded">DETECTIVE</div>
                        <h4 className="font-black text-pop-blue text-xl mb-1">🕵️‍♂️ 2. 傑出偵探獎</h4>
                        <p className="text-sm text-gray-700 font-medium">你查得又快又準，不當偵探可惜。蒐集最多正確情報的人獲得。</p>
                        <div className="mt-3 bg-white border-2 border-black rounded-lg px-3 py-1 inline-block text-sm font-black shadow-sm">
                        🎁 星巴克券 x1
                        </div>
                    </div>

                    {/* Award 3 */}
                    <div className="bg-red-50 border-2 border-black rounded-xl p-4 shadow-[4px_4px_0px_#000] relative">
                        <div className="absolute -top-3 -left-2 bg-pop-red text-white text-xs font-black px-2 py-1 border-2 border-black rounded">CHAOS</div>
                        <h4 className="font-black text-pop-red text-xl mb-1">😈 3. 最佳賤人獎</h4>
                        <p className="text-sm text-gray-700 font-medium">恭喜，你是全場最會亂說、最會亂帶風向的人。提供最多錯誤情報的人獲得。</p>
                        <div className="mt-3 bg-white border-2 border-black rounded-lg px-3 py-1 inline-block text-sm font-black shadow-sm">
                        🎁 飲料 x1
                        </div>
                    </div>
                    </div>
                </div>

                {/* Extra padding for scroll */}
                <div className="h-10"></div>
            </div>
          </TextMagnifier>
        </div>

        {/* Footer Button */}
        <div className="p-4 bg-white border-t-2 border-black z-10">
            <button 
            onClick={onClose}
            className={`w-full bg-pop-red ${borderStyle} rounded-xl py-3 shadow-[2px_2px_0px_#000] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] active:shadow-none active:translate-y-[2px] transition-all cursor-pointer group`}
            >
            <span className="text-xl font-black text-white group-hover:scale-110 transition-transform inline-block">我準備好了</span>
            </button>
        </div>

      </div>
    </div>
  );
};
