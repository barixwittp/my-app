"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"

type AirQualityData = {
  aqi: number
  mainPollutant: string
  location: string
  temperature: number
  humidity: number
  forecast: { day: string; aqi: number }[]
}

type AirQualityContextType = {
  airQualityData: AirQualityData | null
  loading: boolean
  error: string | null
  updateLocation: (lat: number, lon: number) => void
}

const AirQualityContext = createContext<AirQualityContextType | undefined>(undefined)

export const AirQualityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [airQualityData, setAirQualityData] = useState<AirQualityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAirQualityData = async (lat: number, lon: number) => {
    setLoading(true)
    try {
      // In a real app, you would call an actual API here
      const response = await fetch(`/api/air-quality?lat=${lat}&lon=${lon}`)
      const data = await response.json()
      setAirQualityData(data)
    } catch (err) {
      setError("Failed to fetch air quality data")
    } finally {
      setLoading(false)
    }
  }

  const updateLocation = (lat: number, lon: number) => {
    fetchAirQualityData(lat, lon)
  }

  useEffect(() => {
    // Get user's location on initial load
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchAirQualityData(position.coords.latitude, position.coords.longitude)
        },
        () => {
          setError("Unable to retrieve your location")
          setLoading(false)
        },
      )
    } else {
      setError("Geolocation is not supported by your browser")
      setLoading(false)
    }
  }, []) // Removed fetchAirQualityData from dependencies

  return (
    <AirQualityContext.Provider value={{ airQualityData, loading, error, updateLocation }}>
      {children}
    </AirQualityContext.Provider>
  )
}

export const useAirQuality = () => {
  const context = useContext(AirQualityContext)
  if (context === undefined) {
    throw new Error("useAirQuality must be used within a AirQualityProvider")
  }
  return context
}

