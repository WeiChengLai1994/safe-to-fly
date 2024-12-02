"use client"; // 記得這是 Client Component，必須加上 "use client"

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log("Email:", email);
    console.log("Password:", password);
    // 假設註冊成功，跳轉到登入頁面
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
        onSubmit={handleRegister}
      >
        <h2 className="text-black text-2xl font-bold mb-4 text-center">Register</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
            className="w-full px-4 py-2 border border-gray-300 rounded mt-2"
          />
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-lg shadow-lg hover:bg-red-700 transition-all duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}
