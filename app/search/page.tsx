"use client"

import { useState, useEffect } from "react"
import { Search, Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAirQuality } from "@/context/air-quality-context"
import { AirQualityGauge } from "@/components/air-quality-gauge"
import dynamic from "next/dynamic"

// Import Map component dynamically with no SSR
const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-red-100 animate-pulse rounded-lg"></div>
  ),
})

interface SearchResult {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const { updateLocation, airQualityData, loading } = useAirQuality()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setSearching(true)
    try {
      const response = await fetch(
        `/api/geocode?q=${encodeURIComponent(searchQuery)}`
      )
      if (!response.ok) throw new Error("Failed to search location")
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setSearching(false)
    }
  }

  const handleLocationSelect = (location: SearchResult) => {
    setSelectedLocation(location)
    updateLocation(location.lat, location.lon)
    setSearchResults([])
  }

  if (!isMounted) {
    return (
      <div className="container mx-auto p-4">
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="p-6 bg-white shadow-lg rounded-lg">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search for a location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-red-200 focus:ring-red-500 focus:border-red-500"
              />
              {searchResults.length > 0 && (
                <div className="absolute w-full mt-1 bg-white border border-red-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleLocationSelect(result)}
                      className="w-full px-4 py-2 text-left hover:bg-red-50"
                    >
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-gray-500">
                        {result.state ? `${result.state}, ` : ""}{result.country}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button 
              type="submit" 
              className="bg-red-600 hover:bg-red-700 text-white"
              disabled={searching}
            >
              {searching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Search className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Search</span>
                </>
              )}
            </Button>
          </form>
        </Card>

        {selectedLocation && (
          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-lg rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Air Quality in {selectedLocation.name}
              </h2>
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="w-full sm:w-1/2">
                  <AirQualityGauge value={airQualityData?.aqi || 0} loading={loading} />
                </div>
                <div className="w-full sm:w-1/2 space-y-4">
                  {airQualityData && (
                    <>
                      <div>
                        <h3 className="font-medium text-gray-700">Location</h3>
                        <p>{selectedLocation.name}, {selectedLocation.country}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700">Air Quality Index</h3>
                        <p>{airQualityData.aqi}</p>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-700">Status</h3>
                        <p>{getAqiStatus(airQualityData.aqi)}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>

            <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="h-[400px]">
                <Map
                  center={[selectedLocation.lat, selectedLocation.lon]}
                  aqi={airQualityData?.aqi}
                  zoom={12}
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

function getAqiStatus(aqi: number): string {
  if (aqi <= 50) return "Good"
  if (aqi <= 100) return "Moderate"
  if (aqi <= 150) return "Unhealthy for Sensitive Groups"
  if (aqi <= 200) return "Unhealthy"
  if (aqi <= 300) return "Very Unhealthy"
  return "Hazardous"
}
