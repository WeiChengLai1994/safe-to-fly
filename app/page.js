'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 使用 next/navigation

export default function Home() {
  const [moveText, setMoveText] = useState(false);
  const router = useRouter();

  const handleArrowClick = () => {
    setMoveText(true); // 點擊箭頭時，兩個元素的狀態會變為已經移動
    setTimeout(() => {
      router.push('/login'); // 跳轉到下一頁
    }, 150); // 給予動畫一些時間
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/image/shaun-darwood-TC6u_HnDDqs-unsplash.jpg')",
      }}
    >
      {/* 添加 logo */}
      <div className="absolute top-4 left-4">
        <img
            src="/image/Untitled design.png"
            alt="Logo"
            className="h-36 w-auto object-contain"
          />
      </div>

      <main className="flex flex-col items-center justify-center min-h-screen text-white bg-black bg-opacity-50 text-center">
        {/* h1 標籤也加入 moveText 類別，讓它跟 p 標籤一起移動 */}
        <h1
          className={`text-8xl font-bold mb-4 transition-all ${moveText ? 'translate-y-[-100px] opacity-0' : ''}`}
        >
          Captain, Welcome Onboard
        </h1>

        <p
          className={`text-2xl lg:whitespace-nowrap transition-all ${moveText ? 'translate-y-[-100px] opacity-0' : ''}`}
        >
          Go or no go, that is the question. We are here to help you make the right decision.
        </p>

        {/* 向下箭頭 */}
        <div
          onClick={handleArrowClick}
          className="mt-6 cursor-pointer transform transition-transform hover:scale-110"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-white animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </main>
    </div>
  );
}
