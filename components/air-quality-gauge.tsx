export function AirQualityGauge({ value }: { value: number }) {
  const getAqiLabel = (aqi: number) => {
    if (aqi <= 50) return "Good"
    if (aqi <= 100) return "Moderate"
    if (aqi <= 150) return "Unhealthy for Sensitive Groups"
    if (aqi <= 200) return "Unhealthy"
    if (aqi <= 300) return "Very Unhealthy"
    return "Hazardous"
  }

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return "text-green-500"
    if (aqi <= 100) return "text-yellow-500"
    if (aqi <= 150) return "text-orange-500"
    if (aqi <= 200) return "text-red-500"
    if (aqi <= 300) return "text-purple-500"
    return "text-maroon-500"
  }

  return (
    <div className="text-center space-y-4">
      <div
        className={`inline-flex items-center justify-center text-6xl font-bold ${getAqiColor(value)} bg-white rounded-full w-32 h-32`}
      >
        {value}
      </div>

      <div className="text-xl font-semibold">{getAqiLabel(value)}</div>

      <div className="relative h-8">
        <div className="absolute inset-0 flex">
          <div className="flex-1 bg-green-500" />
          <div className="flex-1 bg-yellow-500" />
          <div className="flex-1 bg-orange-500" />
          <div className="flex-1 bg-red-500" />
          <div className="flex-1 bg-purple-500" />
          <div className="flex-1 bg-maroon-500" />
        </div>
        <div className="absolute inset-0 flex justify-between px-4 text-xs text-white font-medium">
          <span>0</span>
          <span>50</span>
          <span>100</span>
          <span>150</span>
          <span>200</span>
          <span>300</span>
          <span>500</span>
        </div>
      </div>
    </div>
  )
}

