"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface MapProps {
  center: [number, number]
  aqi?: number
  zoom?: number
}

const DEFAULT_ZOOM = 12

export default function Map({ 
  center, 
  aqi, 
  zoom = DEFAULT_ZOOM 
}: MapProps) {
  const mapRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      mapRef.current = L.map(containerRef.current, {
        zoomControl: false, // Disable default zoom control
        attributionControl: false // Disable attribution control
      }).setView(center, zoom)
      
      // Add the tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current)

      // Add zoom control to top-right
      L.control.zoom({
        position: 'topright'
      }).addTo(mapRef.current)

      // Add attribution control to bottom-right
      L.control.attribution({
        position: 'bottomright'
      }).addTo(mapRef.current)
    }

    // Update view when center changes
    mapRef.current.setView(center, zoom, { animate: true })

    // Remove existing marker if it exists
    if (markerRef.current) {
      markerRef.current.remove()
    }

    // Create marker with AQI information
    const markerHtml = `
      <div class="flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold ${getAqiColorClass(aqi)}" style="background-color: ${getAqiColor(aqi)}">
        ${aqi || ''}
      </div>
    `

    const icon = L.divIcon({
      html: markerHtml,
      className: 'custom-div-icon',
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    })

    // Add new marker
    markerRef.current = L.marker(center, { icon })
      .addTo(mapRef.current)
      .bindPopup(aqi ? `Air Quality Index: ${aqi}` : 'Selected Location')

    // Handle window resize
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize()
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize)
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [center, aqi, zoom])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full rounded-lg overflow-hidden touch-manipulation"
      style={{ 
        minHeight: "min(calc(100vh - 16rem), 500px)",
        touchAction: "none" // Prevents pull-to-refresh on mobile
      }}
    />
  )
}

function getAqiColor(aqi?: number): string {
  if (!aqi) return '#3B82F6' // blue-500
  if (aqi <= 50) return '#22C55E' // green-500
  if (aqi <= 100) return '#EAB308' // yellow-500
  if (aqi <= 150) return '#F97316' // orange-500
  if (aqi <= 200) return '#EF4444' // red-500
  return '#7C3AED' // purple-500
}

function getAqiColorClass(aqi?: number): string {
  if (!aqi) return 'bg-blue-500'
  if (aqi <= 50) return 'bg-green-500'
  if (aqi <= 100) return 'bg-yellow-500'
  if (aqi <= 150) return 'bg-orange-500'
  if (aqi <= 200) return 'bg-red-500'
  return 'bg-purple-500'
}
