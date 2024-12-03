"use client";

import React, { useState, useEffect } from 'react';
import { AlertCircle, Sun, Wind, CloudRain, Eye } from 'lucide-react';

const AlbertaAirportWeather = () => {
  const [airport, setAirport] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [canFly, setCanFly] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Detailed list of Alberta airports
  const airports = [
    { code: "YYC", name: "Calgary International Airport" },
    { code: "YEG", name: "Edmonton International Airport" },
    { code: "YQF", name: "Red Deer Regional Airport" },
    { code: "YLD", name: "Lloydminster Airport" },
    { code: "YPE", name: "Peace River Airport" },
    { code: "YCY", name: "Clyde River Airport" },
  ];

  const fetchWeatherData = async () => {
    if (!airport) {
      setError("Please select an airport");
      return;
    }

    setLoading(true);
    setError(null);

    try {
    // 替換 YOUR_API_KEY 為你實際的 API 金鑰
    const response = await fetch(`https://avwx.rest/api/metar/${airport}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer 5XhNVz4nzF1urpLl9PPHkJLvDTGEyoqpX0lMZQHz7Do', // 重要：加入 API 金鑰
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HTTP Error: ${response.status}`);
      console.error(`Error Details: ${errorText}`);
      throw new Error('Unable to retrieve weather data');
    }

    const data = await response.json();


      // 解析天氣資料
      const processedWeather = {
        rawMetar: data.raw,
        temperature: data.temperature?.value || null,
        windDirection: data.wind_direction?.value || null,
        windSpeed: data.wind_speed?.value || null,
        gustSpeed: data.wind_gust?.value || null,
        visibility: data.visibility?.value || null,
        cloudCover: data.clouds ? data.clouds[0]?.type : null
      };

      setWeatherData(processedWeather);

      // 飛行條件評估
      const flyConditions = 
        processedWeather.windSpeed <= 35 && 
        processedWeather.visibility >= 5 && 
        processedWeather.cloudCover !== 'OVC';

      setCanFly(flyConditions);
      setLoading(false);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (airport) {
      fetchWeatherData();
    }
  }, [airport]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Alberta Airport Weather Forecast System
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <select
              value={airport}
              onChange={(e) => setAirport(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Airport</option>
              {airports.map((airportInfo) => (
                <option key={airportInfo.code} value={airportInfo.code}>
                  {airportInfo.name} ({airportInfo.code})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            {error && (
              <div className="flex items-center text-red-500 mb-4">
                <AlertCircle className="mr-2" />
                {error}
              </div>
            )}

            {loading && (
              <div className="text-center text-blue-500">
                Loading weather information...
              </div>
            )}

            {weatherData && !loading && (
              <div className="space-y-3">
                <div className="flex items-center">
                  <Sun className="mr-2 text-yellow-500" />
                  <span>Temperature: {weatherData.temperature}°C</span>
                </div>
                <div className="flex items-center">
                  <Wind className="mr-2 text-green-500" />
                  <span>
                    Wind Direction: {weatherData.windDirection}° 
                    Wind Speed: {weatherData.windSpeed} knots
                    {weatherData.gustSpeed ? `(Gusts: ${weatherData.gustSpeed} knots)` : ''}
                  </span>
                </div>
                <div className="flex items-center">
                  <Eye className="mr-2 text-blue-500" />
                  <span>Visibility: {weatherData.visibility} kilometers</span>
                </div>
                <div className="flex items-center">
                  <CloudRain className="mr-2 text-gray-500" />
                  <span>Cloud Cover: {weatherData.cloudCover}</span>
                </div>

                <div className={`mt-4 p-3 rounded-md ${canFly ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {canFly 
                    ? 'Flight conditions are good, ready for takeoff' 
                    : 'Flight conditions are unfavorable, recommend postponing'}
                </div>

                <div className="text-sm text-gray-500 mt-2">
                  Original METAR: {weatherData.rawMetar}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbertaAirportWeather;