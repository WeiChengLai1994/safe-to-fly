"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  AlertCircle,
  Sun,
  Wind,
  CloudRain,
  Eye,
  Menu,
  X,
} from "lucide-react";
import debounce from "lodash.debounce";

const AlbertaAirportWeather = () => {
  const [airport, setAirport] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [canFly, setCanFly] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 控制菜單開關
  const menuRef = useRef(null); // 用於追蹤菜單 DOM 節點

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
      const response = await fetch(
        `https://avwx.rest/api/metar/${airport}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AVWX_API_KEY}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        const message = `Error ${response.status}: ${errorText}`;
        setError(message);
        throw new Error(message);
      }

      const data = await response.json();

      const processedWeather = {
        rawMetar: data.raw || "N/A",
        temperature: data.temperature?.value ?? "N/A",
        windDirection: data.wind_direction?.value ?? "N/A",
        windSpeed: data.wind_speed?.value ?? "N/A",
        gustSpeed: data.wind_gust?.value ?? "N/A",
        visibility: data.visibility?.value ?? "N/A",
        cloudCover: data.clouds ? data.clouds[0]?.type || "N/A" : "N/A",
      };

      setWeatherData(processedWeather);

      const flyConditions =
        processedWeather.windSpeed <= 35 &&
        processedWeather.visibility >= 5 &&
        processedWeather.cloudCover !== "OVC";

      setCanFly(flyConditions);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const debouncedFetchWeatherData = debounce(fetchWeatherData, 500);

  useEffect(() => {
    setIsClient(true);
    if (airport) {
      debouncedFetchWeatherData();
    }
  }, [airport]);

  // 點擊畫面其他區域時關閉菜單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!isClient) return null;

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/image/shaun-darwood-TC6u_HnDDqs-unsplash.jpg')",
      }}
    >
      {/* Hamburger Menu */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full bg-blue-600 text-white focus:outline-none"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sliding Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6 z-50"
        >
          <ul className="space-y-4 text-black">
            <li>
              <a href="#pilot-profile" className="text-blue-600 hover:underline">
                Pilot Profile
              </a>
            </li>
            <li>
              <a href="#flight-log" className="text-blue-600 hover:underline">
                Flight Log
              </a>
            </li>
            <li>
              <button
                onClick={() => alert("Logging out...")}
                className="text-red-600 hover:underline"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      )}

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Alberta Airport Weather Forecast System
        </h2>
        <div className="absolute top-4 left-4">
          <img
            src="/image/Untitled design.png"
            alt="Logo"
            className="h-36 w-auto object-contain"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <select
              value={airport}
              onChange={(e) => setAirport(e.target.value)}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Select Airport</option>
              {airports.map((airportInfo) => (
                <option key={airportInfo.code} value={airportInfo.code}>
                  {airportInfo.name} ({airportInfo.code})
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-100 p-4 rounded-md text-black">
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
                    Wind Direction: {weatherData.windDirection}° Wind Speed:{" "}
                    {weatherData.windSpeed} knots{" "}
                    {weatherData.gustSpeed
                      ? `(Gusts: ${weatherData.gustSpeed} knots)`
                      : ""}
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

                <div
                  className={`mt-4 p-3 rounded-md ${
                    canFly
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {canFly
                    ? "Flight conditions are good, ready for takeoff"
                    : "Flight conditions are unfavorable, recommend postponing"}
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
