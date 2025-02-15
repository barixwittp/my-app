"use client"

import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Info, AlertTriangle, RefreshCw } from "lucide-react"
import { AirQualityGauge } from "@/components/air-quality-gauge"
import { AirQualityForecast } from "@/components/air-quality-forecast"
import { PollutantCard } from "@/components/pollutant-card"
import { useAirQuality } from "@/context/air-quality-context"
import { HealthRecommendations } from "@/components/health-recommendations"

export default function Monitor() {
  const { airQualityData, loading, error, updateLocation } = useAirQuality()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  if (!airQualityData) {
    return <div className="flex justify-center items-center h-screen">No data available</div>
  }

  const { aqi, mainPollutant, location, temperature, humidity, forecast } = airQualityData

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "bg-green-500"
    if (aqi <= 100) return "bg-yellow-500"
    if (aqi <= 150) return "bg-orange-500"
    if (aqi <= 200) return "bg-red-500"
    if (aqi <= 300) return "bg-purple-500"
    return "bg-maroon-500"
  }

  const refreshLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          updateLocation(position.coords.latitude, position.coords.longitude)
        },
        () => {
          console.error("Unable to retrieve your location")
        }
      )
    } else {
      console.error("Geolocation is not supported by your browser")
    }
  }

  return (
    <main className={`flex-1 p-4 space-y-4 ${getAqiColor(aqi)}`}>
      <div className="flex items-center justify-between text-white">
        <div>
          <h1 className="text-2xl font-bold">{location}</h1>
          <p className="text-sm">Updated Just Now</p>
        </div>
        <div className="flex gap-4 items-center">
          <button 
            onClick={refreshLocation}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            title="Refresh location"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            <Image src="/placeholder.svg" alt="Facebook" width={24} height={24} className="object-contain" />
            <Image src="/placeholder.svg" alt="Instagram" width={24} height={24} className="object-contain" />
          </div>
        </div>
      </div>

      <Card className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold">Air Quality Index</h2>
          <Info className="text-gray-500" />
        </div>

        <AirQualityGauge value={aqi} />

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">5 Days Forecast</h3>
            <Info className="text-gray-500" />
          </div>
          <AirQualityForecast data={forecast} />
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h2 className="text-xl font-bold">Current Conditions</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Temperature</p>
            <p className="text-2xl font-bold">{temperature}°C</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="text-2xl font-bold">{humidity}%</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 space-y-4">
        <h2 className="text-xl font-bold">Main Pollutant</h2>
        <PollutantCard
          name={mainPollutant}
          value={aqi}
          unit="AQI"
          status={aqi <= 50 ? "Good" : aqi <= 100 ? "Moderate" : "Unhealthy"}
          color={getAqiColor(aqi)}
        />
      </Card>

      <HealthRecommendations aqi={aqi} />

      {aqi > 100 && (
        <Card className="p-4 bg-red-100 border-red-500 border">
          <div className="flex items-center space-x-2 text-red-700">
            <AlertTriangle />
            <h2 className="text-lg font-semibold">Air Quality Alert</h2>
          </div>
          <p className="mt-2 text-red-600">
            The air quality in your area is currently unhealthy. Please take necessary precautions.
          </p>
        </Card>
      )}
    </main>
  )
}
