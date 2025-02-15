import { NextResponse } from 'next/server'

const OPEN_WEATHER_API_KEY = process.env.OPEN_WEATHER_API_KEY

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json(
      { error: 'Search query is required' },
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
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${OPEN_WEATHER_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch location data')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error searching locations:', error)
    return NextResponse.json(
      { error: 'Failed to search locations' },
      { status: 500 }
    )
  }
}
