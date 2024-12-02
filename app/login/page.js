"use client"; // 記得這是 Client Component，必須加上 "use client"

import { useState } from "react";
import { useRouter } from "next/navigation"; // 使用新的 next/navigation 來代替 next/router

export default function LoginPage() {
  const router = useRouter(); // 用於頁面跳轉

  const handleLogin = (e) => {
    e.preventDefault();
    // 跳過驗證，直接導航到 flighttool 頁面
    router.push("/flighttool"); // 假設登入後跳轉到 flighttool 頁面
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/image/shaun-darwood-TC6u_HnDDqs-unsplash.jpg')", // 設置與首頁相同的背景圖像
      }}
    >
      <form
        className="bg-white p-6 rounded shadow-lg w-96"
        onSubmit={handleLogin}
      >
        <h2 className="text-black text-2xl font-bold mb-4 text-center">Login</h2>

        <div className="mb-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="mb-6">
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300"
        >
          Log in
        </button>

        <div className="relative mt-4 text-center z-10 bg-transparent">
          <span>No Account? </span>
          <a
            href="/register"
            className="text-blue-500 hover:underline"
          >
            Register one
          </a>
        </div>
      </form>
    </div>
  );
}
