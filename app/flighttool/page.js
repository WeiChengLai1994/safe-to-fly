"use client"; // 記得這是 Client Component，必須加上 "use client"

import { useState, useEffect } from "react";

export default function FlightTool() {
  const [airport, setAirport] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [canFly, setCanFly] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const airports = ["LAX", "JFK", "ORD", "SFO"]; // 你可以從API或資料庫中獲取這些機場資訊

  const handleDateChange = (e) => setDate(e.target.value);

  const fetchWeatherData = async () => {
    if (!airport || !date) return;

    const response = await fetch(`/api/weather?airport=${airport}&date=${date}`);
    const data = await response.json();

    setWeatherData(data);

    // 判斷飛行條件
    if (data.windSpeed < 30 && data.visibility > 5 && data.cloudCover < 50) {
      setCanFly(true);
    } else {
      setCanFly(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, [airport, date]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Flight Decision Tool</h2>

      <select
        value={airport}
        onChange={(e) => setAirport(e.target.value)}
        className="mb-4 p-2 border"
      >
        <option value="">Select Airport</option>
        {airports.map((airportCode) => (
          <option key={airportCode} value={airportCode}>
            {airportCode}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={handleDateChange}
        className="mb-4 p-2 border"
      />

      <button
        onClick={fetchWeatherData}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Check Weather
      </button>

      {weatherData && (
        <div className="mt-4">
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Wind Speed: {weatherData.windSpeed} km/h</p>
          <p>Visibility: {weatherData.visibility} km</p>
          <p>Cloud Cover: {weatherData.cloudCover}%</p>
          <p>
            {canFly
              ? "Conditions are good for flying."
              : "Conditions are not suitable for flying."}
          </p>
        </div>
      )}
    </div>
  );
}
