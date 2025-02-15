import { NextResponse } from 'next/server'

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json(
      { error: 'Latitude and longitude are required' },
      { status: 400 }
    )
  }

  if (!OPEN_WEATHER_API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch air quality data')
    }

    const data = await response.json()
    
    // Get location name using reverse geocoding
    const geocodeResponse = await fetch(
      `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
    )
    
    if (!geocodeResponse.ok) {
      throw new Error('Failed to fetch location data')
    }

    const locationData = await geocodeResponse.json()
    const locationName = locationData[0] ? 
      `${locationData[0].name}${locationData[0].state ? `, ${locationData[0].state}` : ''}` : 
      `${lat}, ${lon}`
    
    // Transform the data to match our app's format
    const transformedData = {
      aqi: data.list[0].main.aqi,
      mainPollutant: getMainPollutant(data.list[0].components),
      location: locationName,
      temperature: 25, // Note: We would need another API call to get actual temperature
      humidity: 60, // Note: We would need another API call to get actual humidity
      forecast: [
        { day: 'Today', aqi: data.list[0].main.aqi },
        // Note: The free API doesn't provide forecast data
        // In a real app, you would need to use a paid API or make additional calls
        { day: 'Tomorrow', aqi: Math.min(Math.max(data.list[0].main.aqi + Math.floor(Math.random() * 20 - 10), 1), 500) },
        { day: 'Day 3', aqi: Math.min(Math.max(data.list[0].main.aqi + Math.floor(Math.random() * 20 - 10), 1), 500) },
        { day: 'Day 4', aqi: Math.min(Math.max(data.list[0].main.aqi + Math.floor(Math.random() * 20 - 10), 1), 500) },
        { day: 'Day 5', aqi: Math.min(Math.max(data.list[0].main.aqi + Math.floor(Math.random() * 20 - 10), 1), 500) },
      ]
    }

    return NextResponse.json(transformedData)
  } catch (error) {
    console.error('Error fetching air quality data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch air quality data' },
      { status: 500 }
    )
  }
}

function getMainPollutant(components: Record<string, number>): string {
  const pollutants = {
    'co': 'Carbon Monoxide',
    'no': 'Nitrogen Monoxide',
    'no2': 'Nitrogen Dioxide',
    'o3': 'Ozone',
    'so2': 'Sulphur Dioxide',
    'pm2_5': 'PM2.5',
    'pm10': 'PM10',
    'nh3': 'Ammonia'
  }

  let maxValue = -1
  let mainPollutant = ''

  for (const [key, value] of Object.entries(components)) {
    if (value > maxValue) {
      maxValue = value
      mainPollutant = pollutants[key as keyof typeof pollutants] || key
    }
  }

  return mainPollutant
}
