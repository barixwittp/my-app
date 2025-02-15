"use client"

import { useState } from "react"
import { Search, Locate } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAirQuality } from "@/context/air-quality-context"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: () => <div className="w-full h-[calc(100vh-120px)] bg-red-100 animate-pulse" />,
})

interface SearchResult {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}

export default function Maps() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)
  const { airQualityData, updateLocation } = useAirQuality()

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: [number, number] = [position.coords.latitude, position.coords.longitude]
          setSelectedLocation(newLocation)
          updateLocation(position.coords.latitude, position.coords.longitude)
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      const response = await fetch(
        `/api/geocode?q=${encodeURIComponent(searchQuery)}`
      )
      if (!response.ok) throw new Error("Failed to search location")
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error("Error searching location:", error)
      setSearchResults([])
    }
  }

  const handleLocationSelect = (location: SearchResult) => {
    const newLocation: [number, number] = [location.lat, location.lon]
    setSelectedLocation(newLocation)
    updateLocation(location.lat, location.lon)
    setSearchResults([])
    setSearchQuery("")
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col p-2 sm:p-4 bg-red-50">
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full border-red-200 focus:ring-red-500 focus:border-red-500"
          />
          {searchResults.length > 0 && (
            <div className="absolute w-full mt-1 bg-white border border-red-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  className="w-full px-4 py-2 text-left hover:bg-red-50 text-sm"
                  onClick={() => handleLocationSelect(result)}
                >
                  <div className="font-medium">{result.name}</div>
                  <div className="text-gray-500 text-xs">
                    {result.state && `${result.state}, `}{result.country}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-2 sm:w-auto">
          <Button 
            onClick={handleSearch} 
            className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700"
          >
            <Search className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Search</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={getUserLocation} 
            className="flex-1 sm:flex-none border-red-200 hover:bg-red-100"
          >
            <Locate className="w-4 h-4 sm:mr-2 text-red-600" />
            <span className="hidden sm:inline">My Location</span>
          </Button>
        </div>
      </div>
      <div className="flex-1 relative min-h-[calc(100vh-16rem)] bg-red-100 rounded-lg overflow-hidden">
        {selectedLocation && (
          <Map 
            center={selectedLocation} 
            aqi={airQualityData?.aqi} 
            zoom={12}
          />
        )}
      </div>
    </div>
  )
}
